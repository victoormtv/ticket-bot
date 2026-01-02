const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const { roles } = require('../data/ids');
const config = require('../data/config');
const { generateSalesExcel } = require('../utils/excelHelper');
const fs = require('fs');
const path = require('path');

const salesFilePath = path.join(__dirname, '../data/sales.json');

function loadSales() {
    if (!fs.existsSync(salesFilePath)) {
        return [];
    }
    const data = fs.readFileSync(salesFilePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reporte-mensual')
        .setDescription('Generar reporte de ventas en Excel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option.setName('mes')
                .setDescription('Mes a reportar (1-12). Si no se especifica, muestra todas las ventas.')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(12))
        .addIntegerOption(option =>
            option.setName('año')
                .setDescription('Año del reporte')
                .setRequired(false)
                .setMinValue(2020)
                .setMaxValue(2030)),

    async execute(interaction) {
        const userRoles = interaction.member.roles.cache;
        const isAdmin = roles.ADMIN.some(adminId => userRoles.has(adminId));

        if (!isAdmin) {
            return await interaction.reply({
                content: '❌ Solo los admins pueden generar reportes.',
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const ventas = loadSales();
        const mes = interaction.options.getInteger('mes');
        const año = interaction.options.getInteger('año') || new Date().getFullYear();

        if (!ventas.length) {
            return await interaction.editReply({
                content: '❌ No hay ventas registradas aún.',
                ephemeral: true
            });
        }

        let ventasFiltradas = ventas.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            const añoVenta = fechaVenta.getFullYear();
            
            if (mes) {
                const mesVenta = fechaVenta.getMonth() + 1;
                return añoVenta === año && mesVenta === mes;
            }
            
            return añoVenta === año;
        });

        if (!ventasFiltradas.length) {
            const periodo = mes ? `mes ${mes}/${año}` : `año ${año}`;
            return await interaction.editReply({
                content: `❌ No hay ventas para ${periodo}.`,
                ephemeral: true
            });
        }

        try {
            console.log(`📊 Generando reporte: ${ventasFiltradas.length} ventas para ${mes ? `mes ${mes}` : 'año'}/${año}`);
            
            const buffer = await generateSalesExcel(ventasFiltradas, mes, año);
            
            if (!buffer) {
                return await interaction.editReply({
                    content: '❌ Error al generar el archivo Excel.',
                    ephemeral: true
                });
            }

            const mesNombre = mes ? `-mes-${mes.toString().padStart(2, '0')}` : '-anual';
            const attachment = new AttachmentBuilder(buffer, {
                name: `reporte-ventas${mesNombre}-${año}.xlsx`
            });

            // Separar ventas normales y upgrades
            const ventasNormales = ventasFiltradas.filter(v => v.tipoVenta !== 'upgrade');
            const ventasUpgrade = ventasFiltradas.filter(v => v.tipoVenta === 'upgrade');

            const totalVentas = ventasFiltradas.length;
            const totalVentasNormales = ventasNormales.length;
            const totalUpgrades = ventasUpgrade.length;

            // Ingresos
            const ingresosNormales = ventasNormales.reduce((sum, v) => sum + (v.precioRealSoles || v.precioEstandar || 0), 0);
            const ingresosUpgrades = ventasUpgrade.reduce((sum, v) => sum + (v.montoNetoSoles || 0), 0);
            const totalIngresos = ingresosNormales + ingresosUpgrades;

            // Comisiones
            const comisionVentaNormal = ventasNormales.reduce((sum, v) => sum + (v.comisionVenta || 0), 0);
            const comisionVentaUpgrade = ventasUpgrade.reduce((sum, v) => sum + (v.comisionVendedor || 0), 0);
            const totalComisionesVenta = comisionVentaNormal + comisionVentaUpgrade;
            const totalComisionesSoporte = ventasNormales.reduce((sum, v) => sum + (v.comisionSoporte || 0), 0);
            const totalComisiones = totalComisionesVenta + totalComisionesSoporte;
            
            // Ajustes (solo ventas normales)
            const ventasConDescuento = ventasNormales.filter(v => v.tipoAjuste === 'descuento').length;
            const ventasConPropina = ventasNormales.filter(v => v.tipoAjuste === 'propina').length;
            const ventasSinAjuste = ventasNormales.filter(v => v.tipoAjuste === 'ninguno').length;

            const embed = new EmbedBuilder()
                .setTitle('> HyperV - Reporte de Ventas')
                .setDescription(`**Periodo:** ${mes ? `Mes ${mes}/${año}` : `Año ${año}`}\n\n📊 **Resumen General**`)
                .addFields(
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: 'Ventas Totales', value: `**${totalVentas}**`, inline: true },
                    { name: 'Ingresos Totales', value: `**S/ ${totalIngresos.toFixed(2)}**`, inline: true },
                    { name: 'Comisiones', value: `**S/ ${totalComisiones.toFixed(2)}**`, inline: true },
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: 'Ventas Normales', value: `${totalVentasNormales} (${((totalVentasNormales/totalVentas)*100).toFixed(1)}%)`, inline: true },
                    { name: 'Upgrades', value: `${totalUpgrades} (${totalUpgrades > 0 ? ((totalUpgrades/totalVentas)*100).toFixed(1) : '0.0'}%)`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: 'Ingresos Normales', value: `S/ ${ingresosNormales.toFixed(2)}`, inline: true },
                    { name: 'Ingresos Upgrades', value: `S/ ${ingresosUpgrades.toFixed(2)}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: 'Com. Ventas', value: `S/ ${comisionVentaNormal.toFixed(2)}`, inline: true },
                    { name: 'Com. Upgrades (30%)', value: `S/ ${comisionVentaUpgrade.toFixed(2)}`, inline: true },
                    { name: 'Com. Soporte', value: `S/ ${totalComisionesSoporte.toFixed(2)}`, inline: true },
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: 'Sin Ajuste', value: `${ventasSinAjuste}`, inline: true },
                    { name: 'Con Descuento', value: `${ventasConDescuento}`, inline: true },
                    { name: 'Con Propina', value: `${ventasConPropina}`, inline: true },
                    { name: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', value: '\u200b', inline: false },
                    { name: '📄 Archivo Generado', value: `\`${attachment.name}\``, inline: false }
                )
                .setColor(config.embedColor)
                .setFooter({ text: `Generado por ${interaction.user.username}` })
                .setTimestamp();

            await interaction.editReply({
                embeds: [embed],
                files: [attachment],
                ephemeral: true
            });

            console.log(`✅ Reporte generado: ${totalVentasNormales} normales + ${totalUpgrades} upgrades = ${totalVentas} total (${interaction.user.tag})`);

        } catch (error) {
            console.error('❌ Error generando reporte:', error);
            await interaction.editReply({
                content: `❌ Error al generar el reporte: ${error.message}`,
                ephemeral: true
            });
        }
    }
};
