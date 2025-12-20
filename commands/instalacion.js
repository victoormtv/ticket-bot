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
    .setName('instalacion')
    .setDescription('Muestra guía de instalación de productos')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Selecciona el producto')
        .setRequired(true)
        .addChoices(
          { name: 'Productos de PC', value: 'panel-emulador' },
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

    const guias = {
        'panel-emulador': {
          titulo: '> Instalación: Productos de PC',
          pasos: [
            '<a:1_:1157447561339215963> **Descarga e instala Anydesk:** https://anydesk.com/es/downloads/thank-you?dv=win_exe',
            '- Selecciona la opcion de Instalar Anydesk\n- Click en Instalar y en Si cuando te aparezca la ventana emergente\n- Una vez instalado, click en Nueva conexion, que esta en la barra superior de la ventana\n- Click en el codigo de 10 digitos para copiarlo (numeros rojos en grande) y compartelo al soporte asignado',
            '**__REQUISITOS__**:\n- Desactiva el Windows Defender con esto: [Desactivar Windows Defender](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg)\n- Elimina el emulador que tengas con esto: [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614)\n- Descarga los requerimientos: [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) y [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)\n\n**__EMULADORES COMPATIBLES__:**\n[Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n[BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n[BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n[MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n**__VERSIONES DE FREE FIRE__:**\n[Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n[Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n[Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n<a:_alerta_:1316557202621988915> **SIGUE LAS INDICACIONES DEL SOPORTE** <a:_alerta_:1316557202621988915>',
            '**Soporte:**\n- Si tienes problemas, contacta soporte\n- Envía capturas de pantalla del error\n- No compartas tu licencia con nadie'
          ],
          thumbnail: 'https://i.ibb.co/9kwN9msc/PERFIL-HYPER-V-AZUL-5.png',
          color: (config.embedColor)
        }
      };

    const guia = guias[producto];

    if (!guia) {
      return await interaction.reply({
        content: '⚠️ Guía no encontrada.',
        flags: 64
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(guia.titulo)
      .setDescription(guia.pasos.join('\n\n'))
      .setColor(guia.color)
      .setThumbnail(guia.thumbnail)
      .setFooter(config.embedFooter)
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });

    console.log(`📖 ${interaction.user.tag} envió guía de instalación: ${producto}`);
  }
};