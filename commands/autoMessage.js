const { EmbedBuilder } = require('discord.js');
const { roles, channels } = require('../data/ids');
const config = require('../data/config');
const sendEmbed = require('../utils/sendEmbed');

const messageEmbed = new EmbedBuilder()
  .setTitle('> ¡Adquiere un Producto HyperV! <a:flashrayo:1450570834212032746>')
  .setDescription(`
        Sigue estos pasos para generar un Ticket de Atención Personalizada:

        <a:1_:1157447561339215963> Elige un producto en nuestras categorías de la HyperV Shop.
        <a:2_:1157447558713581678> Selecciona una opción de nuestro menú de precios.
        <a:3_:1157447554645102643> Se abrirá un Ticket y un <@&${roles.VENDOR}> se encargará de atenderte.

        __**VENTAJAS:**__
        <:Captura9:1316483320053366814> Compra rápida y segura <:compra:1316171968717918379>
        <:Captura9:1316483320053366814> Garantía de productos <:garantia:1321973733971333150>
        <:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>

        <a:MI_info_warn:1317201018739495133> **Descubre la Tienda Online**: [HyperV Store](https://hyperv.store)
        <:instagram36:1317355853182926939> **Síguenos en Instagram**: [@h1perv](https://www.instagram.com/h1perv/)
        <a:987340874914619432:1118071042510954548> **Visita nuestro TikTok**: [@hypervgg](https://www.tiktok.com/@hypervgg)

        <a:ss:1117992086642364487> Recuerda realizar tu compra solo con un <@&${roles.VENDOR}> <a:flashrayo:1450570834212032746>.
        `)
    .setColor(config.embedColor)
    .setImage(config.defaultImage)
    .setFooter(config.embedFooter);

module.exports = async (client) => {
    const sendMessage = async () => {
    const now = new Date();
    const peruTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Lima' }));
    const hours = peruTime.getHours();

    if (hours < 2 || hours >= 7) await sendEmbed(client, channels.AUTO_MESSAGE, messageEmbed);
    else console.log('Horario restringido (2 AM - 7 AM, hora de Perú).');
  };

  sendMessage();
  setInterval(sendMessage, 7200000);
  console.log('Temporizador de mensaje automático iniciado.');
};
