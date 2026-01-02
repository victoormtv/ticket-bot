const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { channels, roles } = require('../data/ids');
const config = require('../data/config');
const { 
    getCommission, 
    convertToSoles, 
    comisionesFijasPorMoneda,
    calcularMontoNeto,
    calcularAjusteAutomatico
} = require('../data/commissionRules');

const salesFilePath = path.join(__dirname, '../data/sales.json');

function loadSales() {
    if (!fs.existsSync(salesFilePath)) {
        fs.writeFileSync(salesFilePath, JSON.stringify([], null, 2));
        return [];
    }
    const data = fs.readFileSync(salesFilePath, 'utf-8');
    return JSON.parse(data);
}

async function generateKeyAuthLicense(producto, periodo) {
    try {
        const productosConKeyAuth = ['Panel Full', 'Panel Secure', 'Panel Only Aimbot', 'Menu Chams'];

        if (!productosConKeyAuth.includes(producto)) {
            return {
                success: true,
                key: null,
                message: 'Producto sin sistema de licencias'
            };
        }

        const sellerKey = process.env.KEYAUTH_SELLER_KEY;

        if (!sellerKey) {
            return {
                success: false,
                error: 'No se encontró KEYAUTH_SELLER_KEY en .env'
            };
        }

        const expiryMap = {
            '1 dia': 1,
            'Semanal': 7,
            '14 dias': 14,
            '15 dias': 15,
            'Mensual': 30,
            '60 dias': 60,
            'Trimestral': 90,
            'Anual': 365,
            'Por Temporada': 90,
            'Permanente': 3650
        };

        const expiry = expiryMap[periodo] || 30;

        const levelMap = {
            'Panel Full': 2,
            'Panel Secure': 4,
            'Panel Only Aimbot': 7,
            'Menu Chams': 6
        };

        const level = levelMap[producto] || 1;

        const url = `https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=add&expiry=${expiry}&mask=XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX&level=${level}&amount=1&owner=&character=2&note=${encodeURIComponent(producto + ' - ' + periodo)}&format=json`;

        const response = await axios.get(url);

        if (response.data.success) {
            return {
                success: true,
                key: response.data.key,
                message: response.data.message
            };
        } else {
            return {
                success: false,
                error: response.data.message || 'Error desconocido al generar licencia'
            };
        }
    } catch (error) {
        console.error('Error generando licencia KeyAuth:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('venta')
        .setDescription('Registrar una venta')
        .addStringOption(option =>
            option.setName('metodopago')
                .setDescription('Método de pago utilizado')
                .setRequired(true)
                .addChoices(
                    { name: 'Yape/Plin', value: 'Yape/Plin' },
                    { name: 'BCP Soles', value: 'BCP Soles' },
                    { name: 'Interbank Soles', value: 'Interbank Soles' },
                    { name: 'Interbank Dolares', value: 'Interbank Dolares' },
                    { name: 'Scotiabank Soles', value: 'Scotiabank Soles' },
                    { name: 'BBVA Soles', value: 'BBVA Soles' },
                    { name: 'Western Union', value: 'Western Union' },
                    { name: 'Remitly', value: 'Remitly' },
                    { name: 'PayPal', value: 'PayPal' },
                    { name: 'CashApp', value: 'CashApp' },
                    { name: 'Binance', value: 'Binance' },
                    { name: 'Zelle', value: 'Zelle' },
                    { name: 'Banco Estado', value: 'Banco Estado' },
                    { name: 'Nequi', value: 'Nequi' },
                    { name: 'Prex', value: 'Prex' },
                    { name: 'Bizum', value: 'Bizum' },
                    { name: 'BanRural', value: 'BanRural' },
                    { name: 'Banco Sol', value: 'Banco Sol' },
                    { name: 'Spin Oxxo', value: 'Spin Oxxo' },
                    { name: 'Clabe Nubank', value: 'Clabe Nubank' },
                    { name: 'CBU Mercado Pago', value: 'CBU Mercado Pago' },
                    { name: 'Banco Guayaquil', value: 'Banco Guayaquil' },
                    { name: 'BanReserva', value: 'BanReserva' },
                    { name: 'Otro', value: 'otro' }
                ))
        .addStringOption(option =>
            option.setName('producto')
                .setDescription('Producto vendido')
                .setRequired(true)
                .addChoices(
                    { name: 'Panel Full', value: 'Panel Full' },
                    { name: 'Panel Secure', value: 'Panel Secure' },
                    { name: 'Panel Only Aimbot', value: 'Panel Only Aimbot' },
                    { name: 'Bypass APK', value: 'Bypass APK' },
                    { name: 'Bypass ID', value: 'Bypass ID' },
                    { name: 'Menu Chams', value: 'Menu Chams' },
                    { name: 'Panel iOS', value: 'Panel iOS' },
                    { name: 'Aimbot Body iOS', value: 'Aimbot Body iOS' },
                    { name: 'Panel Android', value: 'Panel Android' },
                    { name: 'Panel CSGO', value: 'Panel CSGO' },
                    { name: 'Panel COD iOS', value: 'Panel COD iOS' },
                    { name: 'Regedit', value: 'Regedit' },
                    { name: 'Aimlock', value: 'Aimlock' },
                    { name: 'Aimbot Color', value: 'Aimbot Color' },
                    { name: 'Spoofer', value: 'Spoofer' },
                    { name: 'Panel Warzone', value: 'Panel Warzone' },
                    { name: 'Discord Tools', value: 'Discord Tools' }
                ))
        .addStringOption(option =>
            option.setName('periodo')
                .setDescription('Duración del producto')
                .setRequired(true)
                .addChoices(
                    { name: '1 dia', value: '1 dia' },
                    { name: 'Semanal', value: 'Semanal' },
                    { name: '14 dias', value: '14 dias' },
                    { name: '15 dias', value: '15 dias' },
                    { name: 'Mensual', value: 'Mensual' },
                    { name: '60 dias', value: '60 dias' },
                    { name: 'Trimestral', value: 'Trimestral' },
                    { name: 'Anual', value: 'Anual' },
                    { name: 'Por Temporada', value: 'Por Temporada' },
                    { name: 'Permanente', value: 'Permanente' }
                ))
        .addBooleanOption(option =>
            option.setName('requiere_soporte')
                .setDescription('¿Esta venta requiere soporte? (Default: Sí)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('moneda')
                .setDescription('Moneda del pago')
                .setRequired(true)
                .addChoices(
                    { name: 'Soles (PEN)', value: 'PEN' },
                    { name: 'Dólares (USD)', value: 'USD' },
                    { name: 'Pesos Argentinos (ARS)', value: 'ARS' },
                    { name: 'Pesos Colombianos (COP)', value: 'COP' },
                    { name: 'Pesos Mexicanos (MXN)', value: 'MXN' },
                    { name: 'Pesos Chilenos (CLP)', value: 'CLP' },
                    { name: 'Pesos Dominicanos (DOP)', value: 'DOP' },
                    { name: 'Pesos Uruguayos (UYU)', value: 'UYU' },
                    { name: 'Bolivianos (BOB)', value: 'BOB' },
                    { name: 'Quetzales (GTQ)', value: 'GTQ' },
                    { name: 'Euros (EUR)', value: 'EUR' }
                ))
        .addNumberOption(option =>
            option.setName('precio_cobrado')
                .setDescription('Precio cobrado al cliente')
                .setRequired(true)
                .setMinValue(0))
        .addStringOption(option =>
            option.setName('whatsapp')
                .setDescription('Número de WhatsApp del cliente')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('comprobante')
                .setDescription('Imagen del comprobante de pago')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('producto_adicional')
                .setDescription('Producto adicional en combo (opcional)')
                .setRequired(false)
                .addChoices(
                    { name: 'Panel Full', value: 'Panel Full' },
                    { name: 'Panel Secure', value: 'Panel Secure' },
                    { name: 'Bypass APK', value: 'Bypass APK' },
                    { name: 'Bypass ID', value: 'Bypass ID' },
                    { name: 'Panel Only Aimbot', value: 'Panel Only Aimbot' },
                    { name: 'Menu Chams', value: 'Menu Chams' }
                ))
        .addStringOption(option =>
            option.setName('periodo_adicional')
                .setDescription('Período del producto adicional (opcional)')
                .setRequired(false)
                .addChoices(
                    { name: 'Semanal', value: 'Semanal' },
                    { name: '14 dias', value: '14 dias' },
                    { name: 'Mensual', value: 'Mensual' },
                    { name: '60 dias', value: '60 dias' },
                    { name: 'Trimestral', value: 'Trimestral' },
                    { name: 'Anual', value: 'Anual' }
                ))
        .addStringOption(option =>
            option.setName('nota')
                .setDescription('Nota adicional (opcional)')
                .setRequired(false)),

    async execute(interaction) {
        const validChannels = [channels.LOGIN_VENTAS];

        if (!validChannels.includes(interaction.channelId)) {
            return await interaction.reply({
                content: 'Este comando solo puede usarse en el canal de ventas.',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        const metodoPago = interaction.options.getString('metodopago');
        const producto = interaction.options.getString('producto');
        const periodo = interaction.options.getString('periodo');
        const productoAdicional = interaction.options.getString('producto_adicional');
        const periodoAdicional = interaction.options.getString('periodo_adicional');
        const imagen = interaction.options.getAttachment('comprobante');
        const whatsapp = interaction.options.getString('whatsapp') || 'No proporcionado';
        const precioCobrado = interaction.options.getNumber('precio_cobrado');
        const monedaPago = interaction.options.getString('moneda');
        const nota = interaction.options.getString('nota') || '';
        const requiereSoporte = interaction.options.getBoolean('requiere_soporte') ?? true;

        if ((productoAdicional && !periodoAdicional) || (!productoAdicional && periodoAdicional)) {
            return await interaction.editReply({
                content: 'Si agregas un producto adicional, debes especificar también su período.',
                ephemeral: true
            });
        }

        const comisiones = getCommission(producto, periodo);
        let precioEstandarTotal = comisiones.precioEstandar;
        let comisionVentaBase = comisiones.venta;
        let comisionSoporteBase = comisiones.soporte;

        if (precioEstandarTotal === 0) {
            return await interaction.editReply({
                content: `No existe precio estándar para ${producto} - ${periodo}. Verifica la configuración.`,
                ephemeral: true
            });
        }

        let comisionesAdicionales = null;
        if (productoAdicional && periodoAdicional) {
            comisionesAdicionales = getCommission(productoAdicional, periodoAdicional);

            if (comisionesAdicionales.precioEstandar === 0) {
                return await interaction.editReply({
                    content: `No existe precio estándar para ${productoAdicional} - ${periodoAdicional}. Verifica la configuración.`,
                    ephemeral: true
                });
            }

            precioEstandarTotal += comisionesAdicionales.precioEstandar;
            comisionVentaBase += comisionesAdicionales.venta;
            comisionSoporteBase += comisionesAdicionales.soporte;
        }

        if (!requiereSoporte) {
            comisionSoporteBase = 0;
        }

        const montoBrutoCliente = precioCobrado;
        const detallesPago = calcularMontoNeto(montoBrutoCliente, metodoPago, monedaPago);
        const montoNetoSoles = convertToSoles(detallesPago.montoNeto, monedaPago);
        const comisionMetodoPagoSoles = convertToSoles(detallesPago.comisionTotal, monedaPago);

        const ajuste = calcularAjusteAutomatico(montoNetoSoles, precioEstandarTotal);

        console.log(`🔍 Venta #${loadSales().length + 1} - ${ajuste.mensaje}`);

        let comisionVentaFinal = comisionVentaBase;
        let comisionSoporteFinal = comisionSoporteBase;

        if (ajuste.tipo === 'descuento') {
            const factorDescuento = montoNetoSoles / precioEstandarTotal;
            comisionVentaFinal = comisionVentaBase * factorDescuento;
        }

        if (ajuste.tipo === 'propina') {
            comisionVentaFinal += ajuste.propina;
        }

        let comisionFijaAplicada = 0;
        if (comisionesFijasPorMoneda[monedaPago]) {
            comisionFijaAplicada = comisionesFijasPorMoneda[monedaPago];
            comisionVentaFinal += comisionFijaAplicada;
        }

        const licencias = [];

        const licenseResult1 = await generateKeyAuthLicense(producto, periodo);
        if (licenseResult1.key) {
            licencias.push({ producto, periodo, key: licenseResult1.key });
        } else if (licenseResult1.error) {
            return await interaction.editReply({
                content: `Error al generar licencia de ${producto}: ${licenseResult1.error}`,
                ephemeral: true
            });
        }

        if (productoAdicional && periodoAdicional) {
            const licenseResult2 = await generateKeyAuthLicense(productoAdicional, periodoAdicional);
            if (licenseResult2.key) {
                licencias.push({ producto: productoAdicional, periodo: periodoAdicional, key: licenseResult2.key });
            } else if (licenseResult2.error) {
                return await interaction.editReply({
                    content: `Error al generar licencia de ${productoAdicional}: ${licenseResult2.error}`,
                    ephemeral: true
                });
            }
        }

        const sales = loadSales();
        const numeroVenta = sales.length + 1;

        const productosTexto = productoAdicional 
            ? `${producto} + ${productoAdicional}` 
            : producto;

        const periodosTexto = periodoAdicional 
            ? `${periodo} + ${periodoAdicional}` 
            : periodo;

        const ventaData = {
            numeroVenta: numeroVenta,
            tipoVenta: 'normal',
            vendedor: interaction.user.tag,
            vendedorId: interaction.user.id,
            canal: interaction.channel.name,
            canalId: interaction.channelId,
            whatsapp,
            metodoPago,
            producto: productosTexto,
            periodo: periodosTexto,

            precioEstandar: precioEstandarTotal,
            montoBrutoCliente: detallesPago.montoBruto,
            comisionMetodoPago: detallesPago.comisionTotal,
            montoNetoRecibido: detallesPago.montoNeto,
            monedaOriginal: monedaPago,

            precioRealSoles: montoNetoSoles,
            comisionMetodoPagoSoles: comisionMetodoPagoSoles,

            descuento: ajuste.descuento,
            propina: ajuste.propina,
            tipoAjuste: ajuste.tipo,
            diferenciaPorcentaje: ajuste.diferenciaPorcentaje,
            comisionFija: comisionFijaAplicada,
            nota: nota,

            comisionVentaBase: comisionVentaBase,
            comisionSoporteBase: comisionSoporteBase,
            comisionVenta: parseFloat(comisionVentaFinal.toFixed(2)),
            comisionSoporte: parseFloat(comisionSoporteFinal.toFixed(2)),
            monedaComision: 'Soles',

            requiereSoporte: requiereSoporte,
            vendedorSoporte: requiereSoporte ? 'Pendiente' : 'No requerido',
            vendedorSoporteId: null,
            imagen: imagen ? imagen.url : null,
            licencia: licencias.map(l => `${l.producto}: ${l.key}`).join(' | '),
            fecha: new Date().toISOString()
        };

        const embed = new EmbedBuilder()
            .setTitle(`> HyperV - VENTA #${numeroVenta.toString().padStart(3, '0')}`)
            .setDescription(`**Vendedor:** <@${interaction.user.id}>`)
            .addFields(
                { name: 'WhatsApp', value: whatsapp, inline: true },
                { 
                    name: 'Soporte', 
                    value: requiereSoporte ? 'Reacciona con ✅' : 'No requerido', 
                    inline: true 
                },
                { name: 'Método de Pago', value: metodoPago, inline: true },
                { name: 'Producto', value: productosTexto, inline: true },
                { name: 'Período', value: periodosTexto, inline: true },
                { name: 'Monto', value: `${precioCobrado} ${monedaPago}`, inline: true }
            );

        if (nota) {
            embed.addFields({ name: 'Nota', value: nota, inline: false });
        }

        embed.setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setTimestamp();

        if (imagen) {
            embed.setImage(imagen.url);
        }

        const adminMentions = `<@&${roles.ADMIN[0]}>`;
        const mencionSoporte = requiereSoporte ? `<@&${roles.SUPPORT}>` : '';

        const reply = await interaction.editReply({
            content: `${adminMentions} ${mencionSoporte}`,
            embeds: [embed],
            fetchReply: true
        });

        ventaData.messageId = reply.id;
        sales.push(ventaData);
        fs.writeFileSync(salesFilePath, JSON.stringify(sales, null, 2));

        if (requiereSoporte) {
            await reply.react('✅');

            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && !user.bot;
            };

            const collector = reply.createReactionCollector({ 
                filter,
                dispose: true
            });

            let soporteAsignado = false;
            let collectorActivo = true;

            const mensajeExiste = async () => {
                try {
                    await interaction.channel.messages.fetch(reply.id);
                    return true;
                } catch (error) {
                    console.log(`❌ Mensaje de venta #${numeroVenta} fue eliminado. Deteniendo recordatorios.`);
                    return false;
                }
            };

            const recordatorio10min = setTimeout(async () => {
                if (!soporteAsignado && await mensajeExiste()) {
                    const reminderEmbed = new EmbedBuilder()
                        .setDescription(
                            `⏰ **RECORDATORIO:** VENTA #${numeroVenta.toString().padStart(3, '0')} sin asignar\n\n` +
                            `Han pasado 10 minutos y esta venta aún no tiene soporte asignado.\n` +
                            `Por favor, reacciona con ✅ para asignarte.`
                        )
                        .setColor(config.embedColor)
                        .setTimestamp();

                    await interaction.channel.send({ 
                        content: `<@&${roles.SUPPORT}>`,
                        embeds: [reminderEmbed],
                        reply: { messageReference: reply.id }
                    });

                    console.log(`⏰ Recordatorio de 10 min enviado para venta #${numeroVenta}`);
                }
            }, 10 * 60 * 1000);

            // Recordatorios cada 1 hora
            const recordatoriosHora = [];
            for (let i = 1; i <= 11; i++) {
                const tiempoEspera = (10 + (i * 60)) * 60 * 1000;
                
                const recordatorio = setTimeout(async () => {
                    if (!soporteAsignado && await mensajeExiste()) {
                        const horasTranscurridas = Math.floor((10 + (i * 60)) / 60);
                        
                        const reminderEmbed = new EmbedBuilder()
                            .setDescription(
                                `⏰ **RECORDATORIO:** VENTA #${numeroVenta.toString().padStart(3, '0')} sin asignar\n\n` +
                                `Han pasado ${horasTranscurridas} hora(s) y esta venta aún no tiene soporte asignado.\n` +
                                `Por favor, reacciona con ✅ para asignarte.`
                            )
                            .setColor(config.embedColor)
                            .setTimestamp();

                        await interaction.channel.send({ 
                            content: `<@&${roles.SUPPORT}>`,
                            embeds: [reminderEmbed],
                            reply: { messageReference: reply.id }
                        });

                        console.log(`⏰ Recordatorio de ${horasTranscurridas}h enviado para venta #${numeroVenta}`);
                    }
                }, tiempoEspera);

                recordatoriosHora.push(recordatorio);
            }

            // Timer de 12 horas para bloquear
            const timeoutDuration = 12 * 60 * 60 * 1000;
            const timeoutTimer = setTimeout(async () => {
                if (!soporteAsignado && await mensajeExiste()) {
                    collectorActivo = false;
                    collector.stop('timeout');

                    const salesUpdated = loadSales();
                    const ventaIndex = salesUpdated.findIndex(v => v.numeroVenta === numeroVenta);
                    if (ventaIndex !== -1) {
                        salesUpdated[ventaIndex].vendedorSoporte = 'Expirado (12h)';
                        salesUpdated[ventaIndex].soporteBloqueado = true;
                        salesUpdated[ventaIndex].fechaExpiracion = new Date().toISOString();
                        fs.writeFileSync(salesFilePath, JSON.stringify(salesUpdated, null, 2));
                    }

                    try {
                        const updatedEmbed = EmbedBuilder.from(embed)
                            .spliceFields(1, 1, { 
                                name: 'Soporte', 
                                value: '⏱️ Expirado (12h sin asignar)', 
                                inline: true 
                            });

                        await reply.edit({ embeds: [updatedEmbed] });
                    } catch (error) {
                        console.log(`❌ No se pudo editar mensaje de venta #${numeroVenta} (ya fue eliminado)`);
                    }

                    const timeoutEmbed = new EmbedBuilder()
                        .setDescription(
                            `⏱️ **Venta #${numeroVenta.toString().padStart(3, '0')} expirada**\n\n` +
                            `Han pasado 12 horas sin que un soporte marque esta venta.\n` +
                            `La venta ha sido bloqueada y ya no se puede asignar soporte.`
                        )
                        .setColor('#FF0000')
                        .setTimestamp();

                    await interaction.channel.send({ 
                        content: `<@${interaction.user.id}> <@&${roles.ADMIN[0]}>`,
                        embeds: [timeoutEmbed],
                        reply: { messageReference: reply.id }
                    });

                    console.log(`⏱️ Venta #${numeroVenta} expiró después de 12 horas sin soporte asignado`);
                }
            }, timeoutDuration);

            collector.on('collect', async (reaction, user) => {
                if (!collectorActivo) {
                    await reaction.users.remove(user.id);
                    
                    const expiredEmbed = new EmbedBuilder()
                        .setDescription(`⏱️ <@${user.id}>, esta venta expiró hace más de 12 horas y ya no se puede asignar soporte.`)
                        .setColor('#FF0000');
                    
                    const expiredMsg = await interaction.channel.send({ 
                        content: `<@${user.id}>`,
                        embeds: [expiredEmbed] 
                    });
                    
                    setTimeout(() => {
                        expiredMsg.delete().catch(err => console.log('No se pudo eliminar el mensaje:', err));
                    }, 10000);
                    
                    return;
                }

                if (soporteAsignado && ventaData.vendedorSoporteId !== user.id) {
                    await reaction.users.remove(user.id);
                    
                    const warningEmbed = new EmbedBuilder()
                        .setDescription(`⚠️ <@${user.id}>, esta venta ya tiene un soporte asignado (<@${ventaData.vendedorSoporteId}>). Si deseas asignarte, el soporte actual debe quitar su reacción primero.`)
                        .setColor(config.embedColor);
                    
                    const warningMsg = await interaction.channel.send({ 
                        content: `<@${user.id}>`,
                        embeds: [warningEmbed] 
                    });
                    
                    setTimeout(() => {
                        warningMsg.delete().catch(err => console.log('No se pudo eliminar el mensaje:', err));
                    }, 10000);
                    
                    return;
                }

                console.log(`✅ ${user.tag} reaccionó - Asignando como soporte de venta #${numeroVenta}`);

                // Cancelar todos los timers
                clearTimeout(recordatorio10min);
                clearTimeout(timeoutTimer);
                recordatoriosHora.forEach(timer => clearTimeout(timer));

                ventaData.vendedorSoporte = user.tag;
                ventaData.vendedorSoporteId = user.id;

                const salesUpdated = loadSales();
                const ventaIndex = salesUpdated.findIndex(v => v.numeroVenta === numeroVenta);
                if (ventaIndex !== -1) {
                    salesUpdated[ventaIndex].vendedorSoporte = user.tag;
                    salesUpdated[ventaIndex].vendedorSoporteId = user.id;
                    salesUpdated[ventaIndex].fechaAsignacionSoporte = new Date().toISOString();
                    fs.writeFileSync(salesFilePath, JSON.stringify(salesUpdated, null, 2));
                }

                const updatedEmbed = EmbedBuilder.from(embed)
                    .spliceFields(1, 1, { name: 'Soporte', value: `<@${user.id}>`, inline: true });

                await reply.edit({ embeds: [updatedEmbed] });

                const notificationEmbed = new EmbedBuilder()
                    .setDescription(
                        !soporteAsignado 
                            ? `<@${user.id}> ha sido asignado como soporte de la venta #${numeroVenta.toString().padStart(3, '0')}.`
                            : `El soporte ha sido reasignado a <@${user.id}> para la venta #${numeroVenta.toString().padStart(3, '0')}.`
                    )
                    .setColor(config.embedColor);

                const notificationMsg = await interaction.channel.send({ embeds: [notificationEmbed] });

                setTimeout(() => {
                    notificationMsg.delete().catch(err => console.log('No se pudo eliminar el mensaje:', err));
                }, 60000);

                soporteAsignado = true;
            });

            collector.on('remove', async (reaction, user) => {
                console.log(`❌ ${user.tag} quitó su reacción de venta #${numeroVenta}`);

                const salesUpdated = loadSales();
                const venta = salesUpdated.find(v => v.numeroVenta === numeroVenta);

                if (venta && venta.vendedorSoporteId === user.id) {
                    venta.vendedorSoporte = 'Pendiente';
                    venta.vendedorSoporteId = null;

                    const ventaIndex = salesUpdated.findIndex(v => v.numeroVenta === numeroVenta);
                    if (ventaIndex !== -1) {
                        salesUpdated[ventaIndex] = venta;
                        fs.writeFileSync(salesFilePath, JSON.stringify(salesUpdated, null, 2));
                    }

                    const updatedEmbed = EmbedBuilder.from(embed)
                        .spliceFields(1, 1, { name: 'Soporte', value: 'Reacciona con ✅', inline: true });

                    await reply.edit({ embeds: [updatedEmbed] });

                    const liberationEmbed = new EmbedBuilder()
                        .setDescription(`⚠️ <@${user.id}> ha liberado el soporte de la venta #${numeroVenta.toString().padStart(3, '0')}. Disponible para otro soporte.`)
                        .setColor(config.embedColor);

                    const liberationMsg = await interaction.channel.send({ embeds: [liberationEmbed] });

                    setTimeout(() => {
                        liberationMsg.delete().catch(err => console.log('No se pudo eliminar el mensaje:', err));
                    }, 60000);

                    soporteAsignado = false;
                    ventaData.vendedorSoporte = 'Pendiente';
                    ventaData.vendedorSoporteId = null;
                }
            });

            console.log(`🟢 Collector activo para venta #${numeroVenta} (recordatorios: 10min + cada 1h hasta 12h)`);
        } else {
            const reactionCollector = reply.createReactionCollector({
                filter: (reaction, user) => !user.bot,
                dispose: true
            });

            reactionCollector.on('collect', async (reaction, user) => {
                await reaction.users.remove(user.id);
                
                const noSupportEmbed = new EmbedBuilder()
                    .setDescription(`<@${user.id}>, esta venta no requiere soporte. No puedes reaccionar.`)
                    .setColor('#FF0000');
                
                const noSupportMsg = await interaction.channel.send({ 
                    content: `<@${user.id}>`,
                    embeds: [noSupportEmbed] 
                });
                
                setTimeout(() => {
                    noSupportMsg.delete().catch(err => console.log('No se pudo eliminar el mensaje:', err));
                }, 5000);
            });

            console.log(`🔒 Venta #${numeroVenta} registrada SIN SOPORTE (reacciones bloqueadas)`);
        }

        if (licencias.length > 0) {
            let licenciasTexto = '';
            licencias.forEach((lic) => {
                licenciasTexto += `\n**${lic.producto} - ${lic.periodo}:**\n\`\`\`${lic.key}\`\`\``;
            });

            const licenseEmbed = new EmbedBuilder()
                .setTitle('> HyperV - Licencias Generadas')
                .setDescription(
                    `🔑 ${licencias.length > 1 ? 'Licencias generadas' : 'Licencia generada'} automáticamente por KeyAuth\n\n` +
                    '**IMPORTANTE:**\n Copia estas licencias y entrégalas al cliente **SOLO DESPUÉS** de que <@1117934669002965014> haya confirmado el pago.\n' +
                    licenciasTexto
                )
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
                .setTimestamp();

            await interaction.followUp({
                content: `<@${interaction.user.id}> ${licencias.length > 1 ? 'Tus licencias han sido generadas:' : 'Tu licencia ha sido generada:'}`,
                embeds: [licenseEmbed],
                ephemeral: false
            });
        }
    }
};
