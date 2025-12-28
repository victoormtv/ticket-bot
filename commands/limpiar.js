// commands/limpiar.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../data/ids.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limpiar')
    .setDescription('Limpia todos los mensajes del bot en los canales configurados')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    
    const channelsToClean = [
      config.embeds.TICKET_GENERAL,
      config.embeds.PANEL_FULL,
      config.embeds.PANEL_BASIC,
      config.embeds.PANEL_ONLY_AIMBOT,
      config.embeds.CHAMS_PC,
      config.embeds.BYPASS_ID,
      config.embeds.BYPASS_APK,
      config.embeds.PANEL_IOS,
      config.embeds.AIMBOT_BODY_IOS,
      config.embeds.AIMLOCK,
      config.embeds.REGEDIT,
      config.embeds.AIMBOT_COLOR,
      config.embeds.SPOOFER,
      config.embeds.BOOST_RANK,
      config.embeds.PANEL_CSGO,
      config.embeds.PANEL_COD_IOS,
      config.embeds.PANEL_ANDROID,
      config.embeds.PANEL_WARZONE,
      config.embeds.NITRO,
      config.embeds.WEBSITE,
      config.embeds.PAYMENT,
      config.embeds.POLICIES,
      config.embeds.WALLPAPERS,
      config.embeds.SOCIAL_NETWORKS,
      config.embeds.PAGOS_PERU,
      config.embeds.WEBSITE_LOGIN,
      config.embeds.PANEL_FULL_INFO,
      config.embeds.PANEL_SECURE_INFO,
      config.embeds.PANEL_ONLY_AIMBOT_INFO,
      config.embeds.MENU_CHAMS_INFO,
      config.embeds.BYPASS_APK_INFO,
      config.embeds.BYPASS_ID_INFO,
      config.embeds.PANEL_IOS_INFO,
      config.embeds.AIMBOT_BODY_INFO,
      config.embeds.INFO_COMANDOS,
      config.embeds.COMISIONES_INFO,
      config.channels.LOGIN_VENTAS
    ];

    const uniqueChannels = [...new Set(channelsToClean)];
    let totalCleaned = 0;
    let successCount = 0;
    let errorCount = 0;
    
    await interaction.editReply('🧹 Iniciando limpieza de canales...');
    
    for (const channelId of uniqueChannels) {
      try {
        const channel = await interaction.client.channels.fetch(channelId);
        
        if (channel && channel.isTextBased()) {
          const messages = await channel.messages.fetch({ limit: 100 });
          const botMessages = messages.filter(m => m.author.id === interaction.client.user.id);
          
          if (botMessages.size > 0) {
            try {
              const deleted = await channel.bulkDelete(botMessages, true);
              totalCleaned += deleted.size;
              successCount++;
            } catch (bulkError) {
              for (const [, msg] of botMessages) {
                try {
                  await msg.delete();
                  totalCleaned++;
                  await new Promise(resolve => setTimeout(resolve, 500));
                } catch (delError) {
                }
              }
              successCount++;
            }
          }
        }
      } catch (error) {
        errorCount++;
      }
    }
    
    await interaction.editReply({
      content: `✅ **Limpieza completada**\n\n` +
               `🧹 Mensajes eliminados: **${totalCleaned}**\n` +
               `📊 Canales procesados: **${successCount}/${uniqueChannels.length}**` +
               (errorCount > 0 ? `\n⚠️ Errores: **${errorCount}**` : '')
    });
  }
};
