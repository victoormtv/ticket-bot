const { ActivityType } = require('discord.js');
const channelData = require('../data/channelData');
const autoMessage = require('../commands/autoMessage');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('¡Bot listo!');

        let ActivityIndex = 0;
        const activities = [
            { name: 'entregas inmediatas 📦', type: ActivityType.Watching },
            { name: 'tus consultas 💬', type: ActivityType.Listening },
            { name: 'a brindar soporte 24/7 ⚙️', type: ActivityType.Playing },
        ];
        
        if (client.user) {
            setInterval(() => {
                ActivityIndex = (ActivityIndex + 1) % activities.length;
                client.user.setPresence({
                    activities: [activities[ActivityIndex]],
                    status: 'online',
                });
            }, 5000);
        }

        for (const channel of channelData) {
            try {
                const targetChannel = await client.channels.fetch(channel.id);
                if (!targetChannel.isTextBased()) {
                    console.error(`El canal ${channel.id} no es válido para mensajes de texto.`);
                    continue;
                }
                
                await targetChannel.send({
                    embeds: [channel.embed],
                    components: channel.menu ? [channel.menu] : []
                });
                
                console.log(`Mensaje de embed enviado en canal ${channel.id}`);
            } catch (error) {
                console.error(`Error enviando mensaje en canal ${channel.id}:`, error);
            }
        }

        try {
            autoMessage(client);
        } catch (error) {
            console.error('Error al ejecutar autoMessage:', error);
        }
    }
};
