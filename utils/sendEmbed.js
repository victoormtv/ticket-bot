module.exports = async (client, channelId, embed) => {
  try {
    const channel = await client.channels.fetch(channelId);
    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
      console.log(`Mensaje automático enviado a ${channel.name}.`);
    } else {
      console.error('Canal inválido o no es de texto.');
    }
  } catch (err) {
    console.error('Error al enviar mensaje automático:', err);
  }
};
