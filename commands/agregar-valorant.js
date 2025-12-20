const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles, categories } = require('../data/ids');
const config = require('../data/config');

const STORE_URL = 'https://www.hyperv.store';

const productos = {
  'aimbot-color-semanal': {
    nombre: 'Aimbot Color - Semanal',
    variationId: '3970',
    precio: '$25.00'
  },
  'aimbot-color-trimestral': {
    nombre: 'Aimbot Color - Trimestral',
    variationId: '3895',
    precio: '$50.00'
  },
  'aimbot-color-trimestral': {
    nombre: 'Aimbot Color - Anual',
    variationId: '3897',
    precio: '$90.00'
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
    .setName('carrito-valorant')
    .setDescription('Agrega productos de VALORANT al carrito')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto y plan')
        .setRequired(true)
        .addChoices(
          { name: 'Aimbot Color - Semanal ($25)', value: 'aimbot-color-semanal' },
          { name: 'Aimbot Color - Mensual', value: 'aimbot-color-mensual' },
          { name: 'Aimbot Color - Trimestral', value: 'aimbot-color-trimestral' }
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
        `**Categoría:** VALORANT\n` +
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
