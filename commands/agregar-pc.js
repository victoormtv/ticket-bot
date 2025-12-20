const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles, categories } = require('../data/ids');
const config = require('../data/config');

const STORE_URL = 'https://www.hyperv.store';

const productos = {

  'panel-full-semanal': {
    nombre: 'Panel Full - Semanal',
    variationId: '1971',
    precio: '$25.00'
  },
  'panel-full-mensual': {
    nombre: 'Panel Full - Mensual',
    variationId: '1972',
    precio: '$40.00'
  },
  'panel-full-trimestral': {
    nombre: 'Panel Full - Trimestral',
    variationId: '1973',
    precio: '$50.00'
  },
  'panel-full-anual': {
    nombre: 'Panel Full - Anual',
    variationId: '1974',
    precio: '$65.00'
  },

  'panel-secure-semanal': {
    nombre: 'Panel Secure - Semanal',
    variationId: '1980',
    precio: '$11.00'
  },
  'panel-secure-mensual': {
    nombre: 'Panel Secure - Mensual',
    variationId: '1981',
    precio: '$22.00'
  },
  'panel-secure-trimestral': {
    nombre: 'Panel Secure - Trimestral',
    variationId: '1982',
    precio: '$32.00'
  },
  'panel-secure-anual': {
    nombre: 'Panel Secure - Anual',
    variationId: '1983',
    precio: '$40.00'
  },

  'panel-only-aimbot-semanal': {
    nombre: 'Panel Only Aimbot - Semanal',
    variationId: '3931',
    precio: '$6.00'
  },
  'panel-only-aimbot-mensual': {
    nombre: 'Panel Only Aimbot - Mensual',
    variationId: '3932',
    precio: '$15.00'
  },
  'panel-only-aimbot-trimestral': {
    nombre: 'Panel Only Aimbot - Trimestral',
    variationId: '3933',
    precio: '$25.00'
  },
  'panel-only-aimbot-anual': {
    nombre: 'Panel Only Aimbot - Anual',
    variationId: '3934',
    precio: '$30.00'
  },

  'bypass-apk-semanal': {
    nombre: 'Bypass APK - Semanal',
    variationId: '3893',
    precio: '$15.00'
  },
  'bypass-apk-14dias': {
    nombre: 'Bypass APK - 14 días',
    variationId: '2006',
    precio: '$20.00'
  },
  'bypass-apk-30dias': {
    nombre: 'Bypass APK - 30 días',
    variationId: '2007',
    precio: '$35.00'
  },
  'bypass-apk-trimestral': {
    nombre: 'Bypass APK - Trimestral',
    variationId: '2008',
    precio: '$50.00'
  },

  'bypass-uid-14dias': {
    nombre: 'Bypass UID - 14 días',
    variationId: '1988',
    precio: '$20.00'
  },
  'bypass-uid-semanal': {
    nombre: 'Bypass UID - Semanal',
    variationId: '1989',
    precio: '$10.00'
  },
  'bypass-uid-30dias': {
    nombre: 'Bypass UID - 30 días',
    variationId: '1990',
    precio: '$30.00'
  },
  'bypass-uid-60dias': {
    nombre: 'Bypass UID - 60 días',
    variationId: '1991',
    precio: '$45.00'
  },

  'menu-chams-semanal': {
    nombre: 'Menu Chams ESP - Semanal',
    variationId: '2010',
    precio: '$5.00'
  },
  'menu-chams-mensual': {
    nombre: 'Menu Chams ESP - Mensual',
    variationId: '2011',
    precio: '$15.00'
  },
  'menu-chams-trimestral': {
    nombre: 'Menu Chams ESP - Trimestral',
    variationId: '2012',
    precio: '$20.00'
  },
  'menu-chams-anual': {
    nombre: 'Menu Chams ESP - Anual',
    variationId: '2013',
    precio: '$25.00'
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
    .setName('carrito-pc')
    .setDescription('Agrega productos de FREE FIRE EMULADOR al carrito')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto y plan')
        .setRequired(true)
        .addChoices(
          { name: 'Panel Full - Semanal ($25)', value: 'panel-full-semanal' },
          { name: 'Panel Full - Mensual ($40)', value: 'panel-full-mensual' },
          { name: 'Panel Full - Trimestral ($50)', value: 'panel-full-trimestral' },
          { name: 'Panel Full - Anual ($65)', value: 'panel-full-anual' },
          { name: 'Panel Secure - Semanal ($11)', value: 'panel-secure-semanal' },
          { name: 'Panel Secure - Mensual', value: 'panel-secure-mensual' },
          { name: 'Panel Secure - Trimestral', value: 'panel-secure-trimestral' },
          { name: 'Panel Secure - Anual', value: 'panel-secure-anual' },
          { name: 'Panel Only Aimbot - Semanal ($6)', value: 'panel-only-aimbot-semanal' },
          { name: 'Panel Only Aimbot - Mensual', value: 'panel-only-aimbot-mensual' },
          { name: 'Panel Only Aimbot - Trimestral', value: 'panel-only-aimbot-trimestral' },
          { name: 'Panel Only Aimbot - Anual', value: 'panel-only-aimbot-anual' },
          { name: 'Bypass APK - Semanal ($15)', value: 'bypass-apk-semanal' },
          { name: 'Bypass APK - 14 días', value: 'bypass-apk-14dias' },
          { name: 'Bypass APK - 30 días', value: 'bypass-apk-30dias' },
          { name: 'Bypass APK - Trimestral', value: 'bypass-apk-trimestral' },
          { name: 'Bypass UID - 14 días ($10)', value: 'bypass-uid-14dias' },
          { name: 'Bypass UID - Semanal', value: 'bypass-uid-semanal' },
          { name: 'Bypass UID - 30 días', value: 'bypass-uid-30dias' },
          { name: 'Bypass UID - 60 días', value: 'bypass-uid-60dias' },
          { name: 'Menu Chams - Semanal ($5)', value: 'menu-chams-semanal' },
          { name: 'Menu Chams - Mensual', value: 'menu-chams-mensual' },
          { name: 'Menu Chams - Trimestral', value: 'menu-chams-trimestral' },
          { name: 'Menu Chams - Anual', value: 'menu-chams-anual' }
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
        `**Categoría:** FREE FIRE EMULADOR\n` +
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
