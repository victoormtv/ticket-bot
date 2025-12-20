const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { categories } = require('../data/ids');
const { updateTicketActivity } = require('../utils/inactivityChecker');
const { detectLanguage, translateToSpanish, getLanguageName } = require('../utils/translator');
const config = require('../data/config');

const pendingTranslations = new Map();

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    if (message.channel.parentId === categories.TICKETS) {
      await updateTicketActivity(message.channel.id);

      if (message.content.length > 10) {
        try {
          const detectedLang = await detectLanguage(message.content);
          
          if (detectedLang && detectedLang !== 'es') {
            console.log(`🌐 Idioma detectado: ${detectedLang} en mensaje de ${message.author.tag}`);
            
            const translateButton = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`translate_${message.id}`)
                  .setLabel(`Traducir desde ${getLanguageName(detectedLang)}`)
                  .setEmoji('🌐')
                  .setStyle(ButtonStyle.Secondary)
              );

            const translateEmbed = new EmbedBuilder()
              .setDescription(`Mensaje detectado en **${getLanguageName(detectedLang)}**. ¿Deseas traducirlo al español?`)
              .setColor(0x5865F2)
              .setFooter({ text: 'Traducción automática' });

            const botMessage = await message.reply({
              embeds: [translateEmbed],
              components: [translateButton]
            });

            pendingTranslations.set(message.id, {
              originalMessage: message,
              botMessage: botMessage,
              detectedLang: detectedLang,
              client: client
            });

            setTimeout(() => {
              if (pendingTranslations.has(message.id)) {
                botMessage.delete().catch(() => {});
                pendingTranslations.delete(message.id);
              }
            }, 120000);
          }
        } catch (error) {
          console.error('Error en detección de idioma:', error);
        }
      }
    }
  }
};

module.exports.pendingTranslations = pendingTranslations;