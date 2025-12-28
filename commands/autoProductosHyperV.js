// autoProductosHyperV.js

const { EmbedBuilder } = require('discord.js');
const { roles, channels } = require('../data/ids');
const config = require('../data/config');
const sendEmbed = require('../utils/sendEmbed');
const menus = require('../data/menus');

// =====================
// AUTO MENSAJE GENERAL
// =====================

const messageEmbed = new EmbedBuilder()
  .setTitle('> ¡Adquiere un Producto HyperV! <a:flashrayo:1450570834212032746>')
  .setDescription(`
Sigue estos pasos para generar un Ticket de Atención Personalizada:

<a:1_:1157447561339215963> Elige un producto en nuestras categorías de la HyperV Shop.
<a:2_:1157447558713581678> Selecciona una opción de nuestro menú de precios.
<a:3_:1157447554645102643> Se abrirá un Ticket y un <@&${roles.VENDOR}> se encargará de atenderte.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Compra rápida y segura <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Garantía de productos <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>

<a:MI_info_warn:1317201018739495133> **Descubre la Tienda Online**: [HyperV Store](https://hyperv.store)
<:instagram36:1317355853182926939> **Síguenos en Instagram**: [@h1perv](https://www.instagram.com/h1perv/)
<a:987340874914619432:1118071042510954548> **Visita nuestro TikTok**: [@hypervgg](https://www.tiktok.com/@hypervgg)

<a:ss:1117992086642364487> Recuerda realizar tu compra solo con un <@&${roles.VENDOR}> <a:flashrayo:1450570834212032746>.
`)
  .setColor(config.embedColor)
  .setImage(config.defaultImage)
  .setFooter(config.embedFooter);

// =====================
// PRODUCTOS ALEATORIOS
// =====================

const products = [
  {
    name: 'Panel Full',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Acceso completo al panel con todas las funciones.
<a:2_:1157447558713581678> Aimbots full, ESP/Chams, Wallhack.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te ayudará a configurarlo.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Estabilidad y rendimiento máximos <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Actualizaciones constantes <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  },
  {
    name: 'Secure',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Aimbots, Chams y FixLag.
<a:2_:1157447558713581678> Minimiza el riesgo de detección y baneo.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te asesora en la mejor configuración.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Alta seguridad y anonimato <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Garantía de funcionamiento <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  },
  {
    name: 'Aimbot Color',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Mejora tu precisión con aimbot por colores.
<a:2_:1157447558713581678> Configuración ajustable para diferentes juegos.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te guiará en la instalación.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Ventaja competitiva inmediata <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Configuraciones flexibles <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  },
  {
    name: 'Bypass APK',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Bypass indetectable totalmente optimizado para jugar más seguro.
<a:2_:1157447558713581678> Compatible con múltiples versiones de FF y emuladores.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te ayuda a instalar sin errores.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Mayor protección ante baneos <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Rendimiento estable <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  },
  {
    name: 'Discord Tools',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Herramientas para servidores, boosteos y más.
<a:2_:1157447558713581678> Totalmente seguro.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te ayudará a configurarlas.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Gestión profesional de comunidades <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Boosteos para servidores <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  },
  {
    name: 'Panel iOS',
    image: 'https://i.ibb.co/ZpPQNjG9/Whats-App-Image-2025-12-22-at-8-54-12-PM.jpg',
    menu: menus.menuPromociones,
    description: `
<a:1_:1157447561339215963> Aimbots y hologramas para iOS.
<a:2_:1157447558713581678> Máxima estabilidad y rendimiento en cualquier versión de iOS.
<a:3_:1157447554645102643> Un <@&${roles.VENDOR}> te explicará paso a paso.

__**VENTAJAS:**__
<:Captura9:1316483320053366814> Experiencia fluida en iOS <:compra:1316171968717918379>
<:Captura9:1316483320053366814> Integración segura <:garantia:1321973733971333150>
<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>
`
  }
];

function getRandomProduct() {
  const index = Math.floor(Math.random() * products.length);
  return products[index];
}

module.exports = async (client) => {
  // Bandera: true si hoy ya se envió promoción
  let promoSentToday = false;

  // ==============
  // AUTO MENSAJE GENERAL (cada 2h)
  // ==============
  const sendGeneralMessage = async () => {
    const now = new Date();
    const peruTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Lima' })
    );
    const hours = peruTime.getHours();

    // Si ya se envió promo hoy, no enviar mensaje general
    if (promoSentToday) {
      console.log('Hoy ya se envió promoción, saltando mensaje general.');
      return;
    }

    if (hours < 2 || hours >= 7) {
      await sendEmbed(client, channels.AUTO_MESSAGE, messageEmbed);
    } else {
      console.log('Horario restringido (2 AM - 7 AM, hora de Perú).');
    }
  };

  // =========================
  // MENSAJE DE PRODUCTO ALEATORIO (cada 3 días)
  // =========================
  const sendRandomProductMessage = async () => {
    const now = new Date();
    const peruTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Lima' })
    );
    const hours = peruTime.getHours();

    if (hours >= 2 && hours < 7) {
      console.log(
        'Horario restringido para productos (2 AM - 7 AM, hora de Perú).'
      );
      return;
    }

    const product = getRandomProduct();

    const productEmbed = new EmbedBuilder()
      .setTitle(`> ¡${product.name} HyperV en Descuento! <a:flashrayo:1450570834212032746>`)
      .setDescription(`
${product.description}

<a:MI_info_warn:1317201018739495133> **Descubre la Tienda Online**: [HyperV Store](https://hyperv.store)
<:instagram36:1317355853182926939> **Síguenos en Instagram**: [@h1perv](https://www.instagram.com/h1perv/)
<a:987340874914619432:1118071042510954548> **Visita nuestro TikTok**: [@hypervgg](https://www.tiktok.com/@hypervgg)

<a:ss:1117992086642364487> Recuerda realizar tu compra solo con un <@&${roles.VENDOR}> <a:flashrayo:1450570834212032746>.
`)
      .setColor(config.embedColor)
      .setImage(product.image || config.defaultImage)
      .setFooter(config.embedFooter);

    if (!product.menu) {
      await sendEmbed(client, channels.AUTO_MESSAGE, productEmbed);
    } else {
      await sendEmbed(client, channels.AUTO_MESSAGE, productEmbed, [product.menu]);
    }

    // Marcar que hoy ya se envió promo
    promoSentToday = true;

    // Resetear bandera a medianoche (00:00 hora Perú)
    setTimeout(() => {
      promoSentToday = false;
      console.log('Bandera de promoción reseteada para un nuevo día.');
    }, getMsUntilMidnight());
  };

  // Función auxiliar: milisegundos hasta las 00:00 hora Perú
  function getMsUntilMidnight() {
    const now = new Date();
    const peruTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Lima' })
    );
    const tomorrow = new Date(peruTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow - peruTime;
  }

  // ======================
  // INICIO DE TEMPORIZADORES
  // ======================

  // Auto mensaje ahora y cada 2h
  await sendGeneralMessage();
  setInterval(sendGeneralMessage, 7200000); // 2 horas

  // Producto aleatorio cada 3 días
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  setInterval(sendRandomProductMessage, threeDaysMs); // 3 días

  console.log(
    'Temporizador de mensaje general (2h) y productos aleatorios (3 días) iniciado.'
  );
};
