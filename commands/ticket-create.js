const { 
  EmbedBuilder, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  PermissionFlagsBits, 
  ChannelType, 
  MessageFlags 
} = require('discord.js');
const config = require('../data/config');
const { registerNewTicket } = require('../utils/inactivityChecker');

const guildTicketCategoryId = '1118077173295763526';
const adminRoleIds = ['1117933070335623280', '1189251231714115715'];
const vendorRoleId = '1117939958653649027';

const ticketClaimButton = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('ticket-claim')
    .setLabel('Reclamar ticket')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('📝')
);

const ticketCloseButton = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('ticket-close')
    .setLabel('Cerrar ticket')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🔒')
);

const wallpapers = {
  'wallpaper-movil': {
    image: 'https://www.mediafire.com/file/71y2jivaqgv9vs1/Wallpaper+Mobile.png/file',
    description: '¡Gracias por seleccionar el wallpaper para móvil!',
    title: 'Wallpaper Mobile',
  },
  'wallpaper-pc': {
    image: 'https://www.mediafire.com/file/bj5se7uwlbtm7av/Wallpaper+PC.png/file',
    description: '¡Gracias por seleccionar el Wallpaper para PC!',
    title: 'Wallpaper PC',
  },
  'wallpaper-animado-pc': {
    image: 'https://www.mediafire.com/file/urnxkubaowdg8z3/Wallpaper+PC+Animado.mp4/file',
    description: '¡Gracias por seleccionar el Wallpaper Animado para PC!',
    title: 'Wallpaper Animado PC',
  },
};

const feedbacks = {
  'feedback-general': {
    link: 'https://www.instagram.com/h1perv/',
    description: '¡Gracias por visitarnos! Síguenos para más actualizaciones.',
    title: 'Feedback General',
  },
};

const policies = {
  'hyperv-store': {
    link: 'https://www.hyperv.store',
    description: 'Dirígete al apartado de Legal.',
    title: 'HyperV Store',
  },
};

const webpage = {
  'tienda-web': {
    link: 'https://www.hyperv.store',
    description: 'Visita y compra en nuestra Tienda Online.',
    title: 'HyperV Store',
  },
};

const networks = {
  instagram: {
    link: 'https://www.instagram.com/h1perv/',
    description: 'Visita nuestro Instagram.',
    title: 'Instagram',
  },
  tiktok: {
    link: 'https://www.tiktok.com/@hypervgg',
    description: 'Visita nuestro TikTok.',
    title: 'TikTok',
  },
  youtube: {
    link: 'https://www.youtube.com/@hyperggg',
    description: 'Visita nuestro canal de YouTube.',
    title: 'YouTube',
  },
};

module.exports = async (interaction) => {
  const embed = new EmbedBuilder()
    .setTitle('> HyperV - Ticket')
    .setColor(config.embedColor)
    .setFooter(config.embedFooter)
    .setImage(config.defaultImage)
    .setTimestamp();

  try {
    if (!interaction.deferred && !interaction.replied) {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    }

    const { guild, user } = interaction;
    const botMember = guild.members.me;

    if (
      !botMember.permissions.has([
        PermissionFlagsBits.ManageChannels,
        PermissionFlagsBits.ViewChannel,
      ])
    ) {
      embed.setDescription('⚠️ No tengo permisos suficientes para crear tickets. Asegúrate de que tengo permisos para "Gestionar canales" y "Ver canales".');
      return await interaction.editReply({ embeds: [embed] });
    }

    const ticketType = interaction.values?.[0];
    if (!ticketType) {
      embed.setDescription('⚠️ No se seleccionó un tipo de ticket válido.');
      return await interaction.editReply({ embeds: [embed] });
    }

    const createEmbed = (data, label, customText) =>
      new EmbedBuilder()
        .setTitle(data.title)
        .setDescription(
          `${data.description}\n\n[${customText}](${data.link || data.image})\n\n`
        )
        .setColor(config.embedColor)
        .setFooter(config.embedFooter)
        .setImage(config.defaultImage)
        .setTimestamp();

    if (wallpapers[ticketType]) {
      const wallpaperEmbed = createEmbed(
        wallpapers[ticketType], ticketType, 'Haz clic aquí para descargar'
      );
      return await interaction.editReply({
        content: `<@${interaction.user.id}> ha solicitado un wallpaper.`,
        embeds: [wallpaperEmbed],
      });
    }

    if (feedbacks[ticketType]) {
      const feedbackEmbed = createEmbed(
        feedbacks[ticketType], ticketType, 'Visítanos en Instagram'
      );
      return await interaction.editReply({
        content: `<@${interaction.user.id}> ha solicitado ver el feedback.`,
        embeds: [feedbackEmbed],
      });
    }

    if (policies[ticketType]) {
      const policyEmbed = createEmbed(
        policies[ticketType], ticketType, 'Haz clic aquí para visitar'
      );
      return await interaction.editReply({
        content: `<@${interaction.user.id}> ha solicitado las políticas.`,
        embeds: [policyEmbed],
      });
    }

    if (webpage[ticketType]) {
      const webEmbed = createEmbed(
        webpage[ticketType], ticketType, 'Haz clic aquí para visitar'
      );
      return await interaction.editReply({
        content: `<@${interaction.user.id}> ingresó a la Tienda Online.`,
        embeds: [webEmbed],
      });
    }

    if (networks[ticketType]) {
      const networkEmbed = createEmbed(
        networks[ticketType], ticketType, `Visítanos en ${networks[ticketType].title}`
      );
      return await interaction.editReply({
        content: `<@${interaction.user.id}> ha solicitado ver una red social.`,
        embeds: [embeds],
      });
    }

    const category = guild.channels.cache.get(guildTicketCategoryId);
    if (!category) {
      embed.setDescription('⚠️ La categoría de tickets no está configurada correctamente. Contacta con un administrador.');
      return await interaction.editReply({ embeds: [embed] });
    }

    const adminPermissions = adminRoleIds.map((id) => ({
      id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ManageMessages,
        PermissionFlagsBits.ReadMessageHistory,
      ],
    }));

    const channel = await guild.channels.create({
      name: `🛒-${ticketType}-${user.username}`,
      type: ChannelType.GuildText,
      parent: guildTicketCategoryId,
      topic: `Ticket creado por ${user.id} | Tipo: ${ticketType}`,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        {
          id: user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        ...adminPermissions,
        {
          id: vendorRoleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    const welcomeEmbed = new EmbedBuilder()
      .setTitle('> ¡Bienvenido a tu Ticket!')
      .setDescription(
        `<:HyperVZeus1:1326269368291688479> ¡Hola <@${user.id}>!\n\nEste es tu canal de soporte para **${ticketType}**. Un staff del equipo te ayudará pronto.\n\n||<@&${adminRoleIds[0]}>|| ||<@&${vendorRoleId}>||`
      )
      .setColor(config.embedColor)
      .setFooter(config.embedFooter)
      .setImage(config.defaultImage)
      .setTimestamp();

    await channel.send({
      embeds: [welcomeEmbed],
      components: [ticketClaimButton, ticketCloseButton],
    });

    await registerNewTicket(channel.id);
    console.log(`🎫 Ticket ${channel.id} registrado en sistema de inactividad`);

    embed
      .setTitle('> HyperV - Ticket Creado')
      .setDescription(`Tu ticket "${ticketType}" ha sido creado correctamente: ${channel}.`);

    await interaction.editReply({ embeds: [embed] });

  } catch (error) {
    console.error('Error al crear el ticket:', error);

    embed.setDescription('⚠️ Ocurrió un error al intentar crear tu ticket.');
    try {
      if (!interaction.deferred && !interaction.replied) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await interaction.editReply({ embeds: [embed] });
      } else {
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (err2) {
      console.error('No se pudo responder, interacción expirada:', err2.message);
    }
  }
};