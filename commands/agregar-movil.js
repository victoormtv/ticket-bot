const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles, categories } = require('../data/ids');
const config = require('../data/config');

const STORE_URL = 'https://www.hyperv.store';

const productos = {
  'panel-ios-24horas': {
    nombre: 'Panel iOS - 24 horas',
    variationId: '2072',
    precio: '$15.00'
  },
  'panel-ios-semanal': {
    nombre: 'Panel iOS - 1 semana',
    variationId: '3891',
    precio: '$30.00'
  },
  'panel-ios-mensual': {
    nombre: 'Panel iOS - 1 mes',
    variationId: '3892',
    precio: '$50.00'
  },

  'aimbot-body-ios-temporada': {
    nombre: 'Aimbot Body iOS - Temporada',
    variationId: '2075',
    precio: '$65.00'
  },

  'aimlock-ios-anual': {
    nombre: 'AimLock iOS - Anual',
    variationId: '2065',
    precio: '$50.00'
  },
  'aimlock-android-anual': {
    nombre: 'AimLock Android - Anual',
    variationId: '2066',
    precio: '$50.00'
  },

  'regedit-ios-mensual': {
    nombre: 'Regedit iOS - Mensual',
    variationId: '2062',
    precio: '$25.00'
  },
  'regedit-ios-anual': {
    nombre: 'Regedit iOS - Anual',
    variationId: '2059',
    precio: '$35.00'
  },
  'regedit-android-mensual': {
    nombre: 'Regedit Android - Mensual',
    variationId: '2060',
    precio: '$25.00'
  },
  'regedit-android-anual': {
    nombre: 'Regedit Android - Anual',
    variationId: '2061',
    precio: '$35.00'
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
    .setName('carrito-movil')
    .setDescription('Agrega productos de FREE FIRE MOBILE al carrito')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto y plan')
        .setRequired(true)
        .addChoices(
          { name: 'Panel iOS - 24 horas ($15)', value: 'panel-ios-24horas' },
          { name: 'Panel iOS - 1 semana', value: 'panel-ios-semanal' },
          { name: 'Panel iOS - 1 mes', value: 'panel-ios-mensual' },
          { name: 'Aimbot Body iOS - Temporada ($65)', value: 'aimbot-body-ios-temporada' },
          { name: 'AimLock iOS - Anual ($50)', value: 'aimlock-ios-anual' },
          { name: 'AimLock Android - Anual ($50)', value: 'aimlock-android-anual' },
          { name: 'Regedit iOS - Mensual ($25)', value: 'regedit-ios-mensual' },
          { name: 'Regedit iOS - Anual', value: 'regedit-ios-anual' },
          { name: 'Regedit Android - Mensual', value: 'regedit-android-mensual' },
          { name: 'Regedit Android - Anual', value: 'regedit-android-anual' }
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
        `**Categoría:** FREE FIRE MOBILE\n` +
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
