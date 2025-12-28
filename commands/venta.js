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
        option.setName('usuario')
            .setDescription('Usuario del cliente')
            .setRequired(true))
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
                { name: 'Banco Union', value: 'Banco Union' },
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
    .addNumberOption(option =>
        option.setName('precio_cobrado')
            .setDescription('Precio cobrado al cliente')
            .setRequired(true)
            .setMinValue(0))
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
    .addUserOption(option =>
        option.setName('soporte')
            .setDescription('Usuario que dará soporte')
            .setRequired(true))
    .addAttachmentOption(option =>
        option.setName('comprobante')
            .setDescription('Imagen del comprobante de pago')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('whatsapp')
            .setDescription('Número de WhatsApp del cliente')
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
                content: '❌ Este comando solo puede usarse en el canal de ventas.',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        const usuario = interaction.options.getString('usuario');
        const metodoPago = interaction.options.getString('metodopago');
        const producto = interaction.options.getString('producto');
        const periodo = interaction.options.getString('periodo');
        const productoAdicional = interaction.options.getString('producto_adicional');
        const periodoAdicional = interaction.options.getString('periodo_adicional');
        const vendedorSoporte = interaction.options.getUser('soporte');
        const imagen = interaction.options.getAttachment('comprobante');
        const whatsapp = interaction.options.getString('whatsapp') || 'No proporcionado';
        const precioCobrado = interaction.options.getNumber('precio_cobrado');
        const monedaPago = interaction.options.getString('moneda');
        const nota = interaction.options.getString('nota') || '';
        if ((productoAdicional && !periodoAdicional) || (!productoAdicional && periodoAdicional)) {
            return await interaction.editReply({
                content: '❌ Si agregas un producto adicional, debes especificar también su período.',
                ephemeral: true
            });
        }

        const comisiones = getCommission(producto, periodo);
        let precioEstandarTotal = comisiones.precioEstandar;
        let comisionVentaBase = comisiones.venta;
        let comisionSoporteBase = comisiones.soporte;

        if (precioEstandarTotal === 0) {
            return await interaction.editReply({
                content: `❌ No existe precio estándar para ${producto} - ${periodo}. Verifica la configuración.`,
                ephemeral: true
            });
        }

        let comisionesAdicionales = null;
        if (productoAdicional && periodoAdicional) {
            comisionesAdicionales = getCommission(productoAdicional, periodoAdicional);
            
            if (comisionesAdicionales.precioEstandar === 0) {
                return await interaction.editReply({
                    content: `❌ No existe precio estándar para ${productoAdicional} - ${periodoAdicional}. Verifica la configuración.`,
                    ephemeral: true
                });
            }

            precioEstandarTotal += comisionesAdicionales.precioEstandar;
            comisionVentaBase += comisionesAdicionales.venta;
            comisionSoporteBase += comisionesAdicionales.soporte;
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
                content: `❌ Error al generar licencia de ${producto}: ${licenseResult1.error}`,
                ephemeral: true
            });
        }

        if (productoAdicional && periodoAdicional) {
            const licenseResult2 = await generateKeyAuthLicense(productoAdicional, periodoAdicional);
            if (licenseResult2.key) {
                licencias.push({ producto: productoAdicional, periodo: periodoAdicional, key: licenseResult2.key });
            } else if (licenseResult2.error) {
                return await interaction.editReply({
                    content: `❌ Error al generar licencia de ${productoAdicional}: ${licenseResult2.error}`,
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
            vendedor: interaction.user.tag,
            vendedorId: interaction.user.id,
            canal: interaction.channel.name,
            canalId: interaction.channelId,
            usuario,
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
            
            vendedorSoporte: vendedorSoporte.tag,
            vendedorSoporteId: vendedorSoporte.id,
            imagen: imagen ? imagen.url : null,
            licencia: licencias.map(l => `${l.producto}: ${l.key}`).join(' | '),
            fecha: new Date().toISOString()
        };

        const embed = new EmbedBuilder()
            .setTitle(`> HyperV - VENTA #${numeroVenta.toString().padStart(3, '0')}`)
            .setDescription(`**Vendedor:** <@${interaction.user.id}>`)
            .addFields(
                { name: 'Usuario', value: usuario, inline: true },
                { name: 'WhatsApp', value: whatsapp, inline: true },
                { name: 'Soporte', value: `<@${vendedorSoporte.id}>`, inline: true },
                { name: 'Producto', value: productosTexto, inline: true },
                { name: 'Período', value: periodosTexto, inline: true },
                { name: 'Método de Pago', value: metodoPago, inline: true }
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
        const mencionSoporte = `<@&${roles.SUPPORT}>`;

        const reply = await interaction.editReply({
            content: `${adminMentions} ${mencionSoporte}`,
            embeds: [embed],
            fetchReply: true
        });

        if (licencias.length > 0) {
            let licenciasTexto = '';
            licencias.forEach((lic) => {
                licenciasTexto += `\n**${lic.producto} - ${lic.periodo}:**\n\`\`\`${lic.key}\`\`\``;
            });

            const licenseEmbed = new EmbedBuilder()
                .setTitle('> HyperV - Licencias Generadas')
                .setDescription(
                    `🔑 ${licencias.length > 1 ? 'Licencias generadas' : 'Licencia generada'} automáticamente por KeyAuth\n\n` +
                    '<a:_alerta_:1316557202621988915> **IMPORTANTE:** Copia estas licencias y entrégalas al cliente **SOLO DESPUÉS** de que <@1117934669002965014> haya confirmado el pago. <a:_alerta_:1316557202621988915>\n' +
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

        ventaData.messageId = reply.id;
        sales.push(ventaData);
        fs.writeFileSync(salesFilePath, JSON.stringify(sales, null, 2));
    }
};