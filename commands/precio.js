const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles, categories } = require('../data/ids');
const config = require('../data/config');

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
    .setName('precio')
    .setDescription('Muestra los precios de productos de HyperV Store')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto')
        .setRequired(true)
        .addChoices(
          { name: 'Panel Full', value: 'panel-full' },
          { name: 'Panel Secure', value: 'panel-secure' },
          { name: 'Panel Only Aimbot', value: 'panel-aimbot' },
          { name: 'Bypass APK', value: 'bypass-apk' },
          { name: 'Bypass UID', value: 'bypass-uid' },
          { name: 'Menu Chams ESP', value: 'menu-chams' },
          { name: 'Panel iOS', value: 'panel-ios' },
          { name: 'Aimbot Body iOS', value: 'aimbot-ios' },
          { name: 'AimLock', value: 'aimlock' },
          { name: 'Regedit', value: 'regedit' },
          { name: 'Aimbot Color (Valorant)', value: 'aimbot-valorant' },
          { name: 'Panel Warzone', value: 'panel-warzone' },
          { name: 'Discord Tools', value: 'discord-tools' }
        )),

  async execute(interaction) {
    if (!isInTicket(interaction)) {
      return await interaction.reply({
        content: '⚠️ Este comando solo puede usarse dentro de un ticket.',
        flags: 64
      });
    }

    if (!isVendor(interaction)) {
      return await interaction.reply({
        content: '❌ Solo los vendedores pueden ejecutar este comando.',
        flags: 64
      });
    }

    const producto = interaction.options.getString('producto');

    const precios = {
      'panel-full': {
        nombre: 'Panel Full',
        descripcion: 'Panel completo con todas las funciones sin restricciones para Free Fire Emulador',
        planes: [
          { duracion: '- Semanal', precio: '$25.00' },
          { duracion: '- Mensual', precio: '$40.00' },
          { duracion: '- Trimestral', precio: '$50.00' },
          { duracion: '- Anual', precio: '$65.00' }
        ],
        features: ['- Aimbots externals: Neck y Leggit', '- Aimbot Rage sin bug', '- Aimbot Helper sin bug', '- Aimbot Silent', '- ESP/Chams', '- Teletransportacion', '- Speed y WallHack', '- Actualizaciones y soporte incluido'],
        imagen: 'https://i.ibb.co/6cgTD6yP/PRECIO-1-PANEL-FULL.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/panel-full/'
      },

      'panel-secure': {
        nombre: 'Panel Secure',
        descripcion: 'Panel basico con las funciones escenciales para Free Fire Emulador',
        planes: [
          { duracion: '- Semanal', precio: '$11.00' },
          { duracion: '- Mensual', precio: '$23.00' },
          { duracion: '- Trimestral', precio: '$32.00' },
          { duracion: '- Anual', precio: '$40.00' }
        ],
        features: ['- Aimbots external', '- Chams', '- Fix Lag', '- Actualizaciones y soporte incluido'],
        imagen: 'https://i.ibb.co/zj6gS05/PRECIO-1-SECURE-1.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/panel-secure/'
      },

      'panel-aimbot': {
        nombre: 'Panel Only Aimbot',
        descripcion: 'Panel especializado solo en Aimbot para Free Fire',
        planes: [
          { duracion: '- Semanal', precio: '$6.00' },
          { duracion: '- Mensual', precio: '$15.00' },
          { duracion: '- Trimestral', precio: '$25.00' },
          { duracion: '- Anual', precio: '$30.00' }
        ],
        features: ['- Aimbot External: Neck y Leggit', 'Fix Lag', '- Actualizaciones y soporte incluido'],
        imagen: 'https://i.ibb.co/Hf94YH1V/PRECIO-1-ONLY-AIMBOT.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/panel-only-aimbot/'
      },

      'bypass-apk': {
        nombre: 'Bypass APK',
        descripcion: 'Bypass para Android - Juega sin restricciones',
        planes: [
          { duracion: '- Semanal', precio: '$15.00' },
          { duracion: '- 14 días', precio: '$20.00' },
          { duracion: '- 30 días', precio: '$35.00' },
          { duracion: '- Trimestral', precio: '$50.00' }
        ],
        features: ['- Indetectable', '- Activacion Rapida', '- Sin riesgo de black/ban', '- Actualizaciones y soporte incluido'],
        imagen: 'https://i.ibb.co/WvF93mGv/APK-BYPASS-HISTORIA.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/bypass-apk/'
      },

      'bypass-uid': {
        nombre: 'Bypass UID',
        descripcion: 'Bypass vinculado a tu cuenta de Free Fire',
        planes: [
          { duracion: '- Semanal', precio: '$10.00' },
          { duracion: '- 14 dias', precio: '$20.00' },
          { duracion: '- 30 días', precio: '$30.00' },
          { duracion: '- 60 días', precio: '$45.00' }
        ],
        features: ['- Indetectable', '- Activacion Rapida', '- Sin riesgo de black/ban', '- Actualizaciones y soporte incluido'],
        color: (config.embedColor),
        link: 'https://hyperv.store/product/bypass-uid/'
      },

      'menu-chams': {
        nombre: 'Menu Chams ESP',
        descripcion: 'Menú de Chams y ESP para Free Fire Emulador',
        planes: [
          { duracion: '- Semanal', precio: '$5.00' },
          { duracion: '- Mensual', precio: '$15.00' },
          { duracion: '- Trimestral', precio: '$20.00' },
          { duracion: '- Anual', precio: '$25.00' }
        ],
        features: ['- Box ESP', '- Skeleton ESP', '- Distance', '- Colores personalizables', '- Health ESP'],
        imagen: 'https://i.ibb.co/yntvhZB8/PRECIO-1-CHAMS-ESP.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/menu-chams/'
      },

      'panel-ios': {
        nombre: 'Panel iOS',
        descripcion: 'Panel compatible con dispositivos iOS',
        planes: [
          { duracion: '- 24 horas', precio: '$15.00' },
          { duracion: '- 1 semana', precio: '$30.00' },
          { duracion: '- 1 mes', precio: '$50.00' }
        ],
        features: ['- Sin jailbreak', '- Fácil instalación', '- Certificado GBOX', '- iOS 14+'],
        imagen: 'https://i.ibb.co/5hQF9rV9/PRECIO-1-PANEL-IOS.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/panel-ios/'
      },
      
      'aimbot-ios': {
        nombre: 'Aimbot Body iOS',
        descripcion: 'Aimbot especializado para iOS - Apunta al pecho',
        planes: [
          { duracion: '- Por Temporada', precio: '$65.00' }
        ],
        features: ['- Aimbot al pecho', '- Alta precisión', '- Sin bugs de daño', '- Sin jailbreak'],
        color: (config.embedColor),
        link: 'https://hyperv.store/product/aimbot-body-ios/'
      },

      'aimlock': {
        nombre: 'AimLock',
        descripcion: 'Sistema de puntería asistida para iOS y Android',
        planes: [
          { duracion: 'Anual', precio: '$50.00' }
        ],
        features: ['- Facil instalacion', '- Sin bugs de daño', '- iOS y Android', '- Sin jailbreak'],
        imagen: 'https://i.ibb.co/yctctFdR/AIMLOCK-HISTORIA-HYPER-V-1.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/aimlock/'
      },

      'regedit': {
        nombre: 'Regedit',
        descripcion: 'Editor de registro optimizado para iOS & Android',
        planes: [
          { duracion: '- Mensual', precio: '$25.00' },
          { duracion: '- Anual', precio: '$35.00' }
        ],
        features: ['- Corrije la mira', '- Archivos indetectables', '- Preset incluido', '- Fácil de usar'],
        imagen: 'https://i.ibb.co/3mqxX3D8/HYPER-V-REGEDIT-1-2.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/regedit/'
      },

      'aimbot-valorant': {
        nombre: 'Aimbot Color (Valorant)',
        descripcion: 'Aimbot basado en colores para Valorant',
        planes: [
          { duracion: '- Semanal', precio: '$25.00' },
          { duracion: '- Mensual', precio: '$50.00' },
          { duracion: '- Trimestral', precio: '$90.00' }
        ],
        features: ['- Detección por color', '- FOV ajustable', '- Actualizaciones frecuentes', '- Windows 10/11'],
        color: (config.embedColor),
        link: 'https://hyperv.store/product/aimbot-color/'
      },

      'panel-warzone': {
        nombre: 'Panel Warzone',
        descripcion: 'Panel completo con todas las funciones sin restricciones para Warzone',
        planes: [
          { duracion: '- 15 dias', precio: '$30.00' },
          { duracion: '- 30 dias', precio: '$65.00' }
        ],
        features: ['- Aimbot', '- Tiggerbot', '- FOV', '- ESP'],
        color: (config.embedColor)
      },

      'discord-tools': {
        nombre: 'Discord Tools',
        descripcion: 'Herramientas premium, boosteos y nitro para Discord',
        planes: [
          { duracion: '- 1000 Users Online', precio: '$12.00' },
          { duracion: '- 1000 Users Offline', precio: '$25.00' },
          { duracion: '- 7 Boost x1 mes', precio: '$15.00' },
          { duracion: '- 7 Boost x3 meses', precio: '$30.00' },
          { duracion: '- 14 Boost x1 mes', precio: '$30.00' },
          { duracion: '- 14 Boost x3 meses', precio: '$50.00' }
        ],
        features: ['- Members reales', '- Boosts permanentes', '- Nitro disponible', '- Entrega rápida'],
        imagen: 'https://i.ibb.co/0p8Wy8x9/DISCORD-TOOLS-HYPER-V-1.png',
        color: (config.embedColor),
        link: 'https://hyperv.store/product/discord-tools/'
      }
    };

    const info = precios[producto];

    if (!info) {
      return await interaction.reply({
        content: '⚠️ Producto no encontrado.',
        flags: 64
      });
    }

    let planesTexto = '';
    info.planes.forEach(plan => {
      planesTexto += `${plan.duracion}: ${plan.precio}\n`;
    });


    const featuresTexto = info.features.join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`${info.nombre}`)
      .setDescription(info.descripcion)
      .addFields(
        { name: '__PLANES DISPONIBLES__', value: planesTexto, inline: false },
        { name: '__CARACTERISTICAS__', value: featuresTexto, inline: false }
      )
      .setColor(info.color)
      .setImage(info.imagen)
      .setFooter(config.embedFooter)
      .setTimestamp();

    await interaction.reply({
      content: `🛒 **Comprar aquí:** ${info.link}`,
      embeds: [embed]
    });

    console.log(`💵 ${interaction.user.tag} consultó precios de: ${producto}`);
  }
};
