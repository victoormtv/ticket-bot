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
            'Panel Full': 1,
            'Panel Secure': 2,
            'Panel Only Aimbot': 3,
            'Menu Chams': 4
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
                    { name: 'Nequi', value: 'Nequi' },
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
                    { name: 'Regedit', value: 'Regedit' },
                    { name: 'Aimbot Body iOS', value: 'Aimbot Body iOS' },
                    { name: 'Aimlock', value: 'Aimlock' },
                    { name: 'Aimbot Color', value: 'Aimbot Color' },
                    { name: 'Spoofer', value: 'Spoofer' },
                    { name: 'Panel Warzone', value: 'Panel Warzone' }
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
                    { name: 'Quetzales (GTQ)', value: 'GTQ' }
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
                .setDescription('Número de WhatsApp del cliente (opcional)')
                .setRequired(false))
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
        const vendedorSoporte = interaction.options.getUser('soporte');
        const imagen = interaction.options.getAttachment('comprobante');
        const whatsapp = interaction.options.getString('whatsapp') || 'No proporcionado';
        const precioCobrado = interaction.options.getNumber('precio_cobrado');
        const monedaPago = interaction.options.getString('moneda');
        const nota = interaction.options.getString('nota') || '';

        const comisiones = getCommission(producto, periodo);
        const precioEstandar = comisiones.precioEstandar;

        if (precioEstandar === 0) {
            return await interaction.editReply({
                content: `❌ No existe precio estándar para ${producto} - ${periodo}. Verifica la configuración.`,
                ephemeral: true
            });
        }

        const montoBrutoCliente = precioCobrado;
        const detallesPago = calcularMontoNeto(montoBrutoCliente, metodoPago, monedaPago);
        const montoNetoSoles = convertToSoles(detallesPago.montoNeto, monedaPago);
        const comisionMetodoPagoSoles = convertToSoles(detallesPago.comisionTotal, monedaPago);
        
        const ajuste = calcularAjusteAutomatico(montoNetoSoles, precioEstandar);
        
        console.log(`🔍 Venta #${loadSales().length + 1} - ${ajuste.mensaje}`);
        
        let comisionVentaFinal = comisiones.venta;
        let comisionSoporteFinal = comisiones.soporte;

        if (ajuste.tipo === 'descuento') {
            const factorDescuento = montoNetoSoles / precioEstandar;
            comisionVentaFinal = comisiones.venta * factorDescuento;
        }

        if (ajuste.tipo === 'propina') {
            comisionVentaFinal += ajuste.propina;
        }

        let comisionFijaAplicada = 0;
        if (comisionesFijasPorMoneda[monedaPago]) {
            comisionFijaAplicada = comisionesFijasPorMoneda[monedaPago];
            comisionVentaFinal += comisionFijaAplicada;
        }

        const licenseResult = await generateKeyAuthLicense(producto, periodo);

        if (!licenseResult.success && licenseResult.error) {
            return await interaction.editReply({
                content: `❌ Error al generar la licencia: ${licenseResult.error}`,
                ephemeral: true
            });
        }

        const sales = loadSales();
        const numeroVenta = sales.length + 1;

        const ventaData = {
            numeroVenta: numeroVenta,
            vendedor: interaction.user.tag,
            vendedorId: interaction.user.id,
            canal: interaction.channel.name,
            canalId: interaction.channelId,
            usuario,
            whatsapp,
            metodoPago,
            producto,
            periodo,
            
            precioEstandar: precioEstandar,
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
            
            comisionVentaBase: comisiones.venta,
            comisionSoporteBase: comisiones.soporte,
            comisionVenta: parseFloat(comisionVentaFinal.toFixed(2)),
            comisionSoporte: parseFloat(comisionSoporteFinal.toFixed(2)),
            monedaComision: 'Soles',
            
            vendedorSoporte: vendedorSoporte.tag,
            vendedorSoporteId: vendedorSoporte.id,
            imagen: imagen ? imagen.url : null,
            licencia: licenseResult.key || 'No aplica',
            fecha: new Date().toISOString()
        };

        const embed = new EmbedBuilder()
            .setTitle(`> HyperV - VENTA #${numeroVenta.toString().padStart(3, '0')}`)
            .setDescription(`**Vendedor:** <@${interaction.user.id}>`)
            .addFields(
                { name: 'Usuario', value: usuario, inline: true },
                { name: 'WhatsApp', value: whatsapp, inline: true },
                { name: 'Soporte', value: `<@${vendedorSoporte.id}>`, inline: true },
                { name: 'Producto', value: producto, inline: true },
                { name: 'Periodo', value: periodo, inline: true },
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

        if (licenseResult.key) {
            const licenseEmbed = new EmbedBuilder()
                .setTitle('> HyperV - Licencia Generada')
                .setDescription(
                    'Licencia generada automáticamente por KeyAuth\n\n' +
                    '<a:_alerta_:1316557202621988915> **IMPORTANTE:** Copia esta licencia y entrégala al cliente **SOLO DESPUÉS** de que <@1117934669002965014> haya confirmado el pago. <a:_alerta_:1316557202621988915>'
                )
                .addFields(
                    { name: 'Producto', value: producto, inline: true },
                    { name: 'Período', value: periodo, inline: true },
                    { name: 'Usuario', value: usuario, inline: true },
                    { name: 'Licencia', value: `\`\`\`${licenseResult.key}\`\`\``, inline: false }
                )
                .setColor(config.embedColor)
                .setFooter(config.embedFooter)
                .setTimestamp();

            await interaction.followUp({
                content: `<@${interaction.user.id}> Tu licencia ha sido generada:`,
                embeds: [licenseEmbed],
                ephemeral: true
            });
        }


        ventaData.messageId = reply.id;
        sales.push(ventaData);
        fs.writeFileSync(salesFilePath, JSON.stringify(sales, null, 2));
    }
};