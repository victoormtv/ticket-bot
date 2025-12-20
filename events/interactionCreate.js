const { EmbedBuilder } = require('discord.js');
const { translateToSpanish, getLanguageName } = require('../utils/translator');
const config = require('../data/config');
const { pendingTranslations } = require('./messageCreate');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error ejecutando comando ${interaction.commandName}:`, error);
                
                try {
                    const errorMessage = { 
                        content: '❌ Error ejecutando comando', 
                        flags: 64
                    };
                    
                    if (interaction.deferred) {
                        await interaction.editReply(errorMessage);
                    } else if (!interaction.replied) {
                        await interaction.reply(errorMessage);
                    }
                } catch (replyError) {
                    console.error('No se pudo responder a la interacción:', replyError.message);
                }
            }
            return;
        }

        if (interaction.isStringSelectMenu()) {
            try {
                const execute = require(`../commands/${interaction.customId}`);
                await execute(interaction, client);
            } catch (error) {
                console.error(`Error ejecutando interacción (${interaction.customId}):`, error);
            }
        }

        if (interaction.isButton()) {
            try {
                if (interaction.customId.startsWith('translate_')) {
                    const messageId = interaction.customId.split('_')[1];
                    const translationData = pendingTranslations.get(messageId);
                    
                    if (!translationData) {
                        return await interaction.reply({
                            content: '⚠️ Esta traducción ya no está disponible.',
                            flags: 64
                        });
                    }

                    await interaction.deferReply({ flags: 0 });

                    const { originalMessage, detectedLang } = translationData;
                    
                    const result = await translateToSpanish(originalMessage.content, detectedLang);
                    
                    if (result.success) {
                        const translatedEmbed = new EmbedBuilder()
                            .setAuthor({
                                name: originalMessage.author.username,
                                iconURL: originalMessage.author.displayAvatarURL()
                            })
                            .setTitle(`🌐 Traducción: ${getLanguageName(detectedLang)} → Español`)
                            .setDescription(result.translatedText)
                            .setColor(config.embedColor)
                            .addFields(
                                { name: 'Mensaje Original', value: originalMessage.content.substring(0, 1024), inline: false }
                            )
                            .setFooter(config.embedFooter)
                            .setTimestamp();

                        await interaction.editReply({
                            embeds: [translatedEmbed]
                        });

                        translationData.botMessage.delete().catch(() => {});
                        pendingTranslations.delete(messageId);

                        console.log(`✅ Traducción completada: ${detectedLang} → es por ${interaction.user.tag}`);
                    } else {
                        await interaction.editReply({
                            content: '❌ Error al traducir el mensaje. Inténtalo nuevamente.'
                        });
                    }
                }
                else if (interaction.customId === 'ticket-close') {
                    const execute = require('../commands/ticket-close');
                    await execute(interaction, client);
                } 
                else if (interaction.customId === 'ticket-claim') {
                    const execute = require('../commands/ticket-claim');
                    await execute.main(interaction, client);
                }
            } catch (error) {
                console.error(`Error ejecutando interacción con botón (${interaction.customId}):`, error);
            }
        }
    }
};