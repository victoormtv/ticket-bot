const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles, categories } = require('../data/ids');
const config = require('../data/config');

const STORE_URL = 'https://www.hyperv.store';

const productos = {
  'discord-tools-1000-online': {
    nombre: 'Discord Tools - 1000 Users Online',
    variationId: '2090',
    precio: '$12.00'
  },
  'discord-tools-1000-offline': {
    nombre: 'Discord Tools - 1000 Users Offline',
    variationId: '2091',
    precio: '$25.00'
  },
  'discord-tools-7boost-1mes': {
    nombre: 'Discord Tools - 7 Boost x1 mes',
    variationId: '3929',
    precio: '$15.00'
  },
  'discord-tools-7boost-3meses': {
    nombre: 'Discord Tools - 7 Boost x3 meses',
    variationId: '3928',
    precio: '$30.00'
  },
  'discord-tools-14boost-1mes': {
    nombre: 'Discord Tools - 14 Boost x1 mes',
    variationId: '3927',
    precio: '$30.00'
  },
  'discord-tools-14boost-3meses': {
    nombre: 'Discord Tools - 14 Boost x3 meses',
    variationId: '3926',
    precio: '$50.00'
  }
};

function isInTicket(interaction) {
  return interaction.channel.parentId === categories.TICKETS;
}

function isVendor(interaction) {
  const userRoles = interaction.member.roles.cache;
  return roles.ADMIN.some(adminId => userRoles.has(adminId)) || 
         userRoles.has(roles.VENDOR) || 
         userRoles.has(roles.SUPPORT);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('carrito-discord')
    .setDescription('Agrega productos de DISCORD al carrito')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto y plan')
        .setRequired(true)
        .addChoices(
          { name: '1000 Users Online ($15)', value: 'discord-tools-1000-online' },
          { name: '1000 Users Offline', value: 'discord-tools-1000-offline' },
          { name: '7 Boost x1 mes', value: 'discord-tools-7boost-1mes' },
          { name: '7 Boost x3 meses', value: 'discord-tools-7boost-3meses' },
          { name: '14 Boost x1 mes', value: 'discord-tools-14boost-1mes' },
          { name: '14 Boost x3 meses', value: 'discord-tools-14boost-3meses' }
        )),

  async execute(interaction) {
    if (!isInTicket(interaction)) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('> HyperV - Error')
        .setDescription('⚠️ Este comando solo puede usarse dentro de un ticket.')
        .setColor(0xFF0000)
        .setFooter(config.embedFooter)
        .setTimestamp();

      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    if (!isVendor(interaction)) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('> HyperV - Error')
        .setDescription('❌ Solo los vendedores pueden ejecutar este comando.')
        .setColor(0xFF0000)
        .setFooter(config.embedFooter)
        .setTimestamp();

      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const productoKey = interaction.options.getString('producto');
    const producto = productos[productoKey];

    if (!producto) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('> HyperV - Error')
        .setDescription('⚠️ Producto no encontrado.')
        .setColor(0xFF0000)
        .setFooter(config.embedFooter)
        .setTimestamp();

      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const cartLink = `${STORE_URL}/cart-2/?add-to-cart=${producto.variationId}`;

    const cartEmbed = new EmbedBuilder()
      .setTitle(`> 🛒 ${producto.nombre}`)
      .setDescription(
        `**Categoría:** DISCORD TOOLS\n` +
        `**<:precio:1353642263053336576> Precio:** ${producto.precio}\n\n` +
        `**<:garantia:1321973733971333150> Link de compra:**\n` +
        `[<:compra:1316466484133757021> Click aquí para ir al carrito](${cartLink})\n\n` +
        `**También puedes copiar el enlace:**\n` +
        `\`${cartLink}\``
      )
      .setColor(config.embedColor)
      .setFooter(config.embedFooter)
      .setImage(config.defaultImage)
      .setTimestamp();

    await interaction.reply({ embeds: [cartEmbed], ephemeral: false });

    console.log(`🛒 ${interaction.user.tag} agregó al carrito: ${producto.nombre}`);
  }
};
