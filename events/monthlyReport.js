const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { channels } = require('../data/ids');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { generateSalesExcel } = require('../utils/excelHelper');

function loadSales() {
    const salesFilePath = path.join(__dirname, '../data/sales.json');
    if (!fs.existsSync(salesFilePath)) {
        return [];
    }
    const data = fs.readFileSync(salesFilePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = (client) => {
    cron.schedule('0 9 1,15 * *', async () => {
        console.log('📊 Generando reporte quincenal automático...');

        const ventas = loadSales();

        if (!ventas.length) {
            console.log('❌ No hay ventas para reportar.');
            return;
        }

        try {
            const hoy = new Date();
            const mes = hoy.getMonth() + 1;
            const año = hoy.getFullYear();
            const día = hoy.getDate();

            const buffer = await generateSalesExcel(ventas, mes, año);

            if (!buffer) {
                console.log('❌ No hay ventas para el periodo.');
                return;
            }

            const channel = await client.channels.fetch(channels.LOGIN_VENTAS);

            if (channel) {
                const attachment = new AttachmentBuilder(buffer, {
                    name: `reporte-ventas-quincena-${día}-${mes}-${año}.xlsx`
                });

                const embed = new EmbedBuilder()
                    .setTitle('📊 Reporte Quincenal Automático')
                    .setDescription(`**Período:** ${mes}/${año} - Día ${día}`)
                    .addFields(
                        { name: 'Total de Ventas', value: `${ventas.length}`, inline: true }
                    )
                    .setColor('#0099ff')
                    .setTimestamp();

                await channel.send({
                    embeds: [embed],
                    files: [attachment]
                });

                console.log(`✅ Reporte quincenal enviado (${día}/${mes}/${año})`);
            }
        } catch (error) {
            console.error('❌ Error al generar reporte quincenal:', error);
        }
    }, {
        timezone: 'America/Lima'
    });

    console.log('✅ Sistema de reportes quincenales activado (días 1 y 15).');
};
