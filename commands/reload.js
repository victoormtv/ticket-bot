const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Recarga comandos, eventos, utilidades o datos sin reiniciar el bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
      subcommand
        .setName('command')
        .setDescription('Recarga un comando específico')
        .addStringOption(option =>
          option.setName('nombre')
            .setDescription('Nombre del comando a recargar')
            .setRequired(true)
            .setAutocomplete(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('all-commands')
        .setDescription('Recarga todos los comandos'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('event')
        .setDescription('Recarga un evento específico')
        .addStringOption(option =>
          option.setName('nombre')
            .setDescription('Nombre del evento a recargar')
            .setRequired(true)
            .setAutocomplete(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('util')
        .setDescription('Recarga un archivo de utilidades')
        .addStringOption(option =>
          option.setName('nombre')
            .setDescription('Nombre del archivo de utilidad')
            .setRequired(true)
            .setAutocomplete(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('data')
        .setDescription('Recarga un archivo de datos (.js)')
        .addStringOption(option =>
          option.setName('nombre')
            .setDescription('Nombre del archivo de datos')
            .setRequired(true)
            .setAutocomplete(true))),

  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    const subcommand = interaction.options.getSubcommand();

    let choices = [];

    if (subcommand === 'command' && focusedOption.name === 'nombre') {
      const commandsPath = path.join(__dirname, '../commands');
      const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));
      choices = commandFiles;
    }

    if (subcommand === 'event' && focusedOption.name === 'nombre') {
      const eventsPath = path.join(__dirname, '../events');
      const eventFiles = fs.readdirSync(eventsPath)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));
      choices = eventFiles;
    }

    if (subcommand === 'util' && focusedOption.name === 'nombre') {
      const utilsPath = path.join(__dirname, '../utils');
      const utilFiles = fs.readdirSync(utilsPath)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));
      choices = utilFiles;
    }

    if (subcommand === 'data' && focusedOption.name === 'nombre') {
      const dataPath = path.join(__dirname, '../data');
      const dataFiles = fs.readdirSync(dataPath)
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''));
      choices = dataFiles;
    }

    const filtered = choices.filter(choice => 
      choice.toLowerCase().includes(focusedOption.value.toLowerCase())
    ).slice(0, 25);

    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    // ========== RECARGAR COMANDO ESPECÍFICO ==========
    if (subcommand === 'command') {
      const commandName = interaction.options.getString('nombre');
      const command = interaction.client.commands.get(commandName);

      if (!command) {
        return interaction.reply({ content: `❌ No existe el comando \`${commandName}\``, ephemeral: true });
      }

      const commandPath = path.join(__dirname, `${commandName}.js`);
      
      delete require.cache[require.resolve(commandPath)];

      try {
        const newCommand = require(commandPath);
        interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply({ content: `✅ Comando \`${commandName}\` recargado exitosamente`, ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: `❌ Error al recargar \`${commandName}\`:\n\`\`\`${error.message}\`\`\``, ephemeral: true });
      }
    }

    // ========== RECARGAR TODOS LOS COMANDOS ==========
    if (subcommand === 'all-commands') {
      const commandsPath = path.join(__dirname, '../commands');
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

      let reloadedCount = 0;
      let errors = [];

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        delete require.cache[require.resolve(filePath)];

        try {
          const command = require(filePath);
          if ('data' in command && 'execute' in command) {
            interaction.client.commands.set(command.data.name, command);
            reloadedCount++;
          }
        } catch (error) {
          errors.push(`${file}: ${error.message}`);
        }
      }

      if (errors.length > 0) {
        return interaction.reply({ content: `⚠️ ${reloadedCount} comandos recargados con ${errors.length} errores:\n\`\`\`${errors.join('\n').substring(0, 1500)}\`\`\``, ephemeral: true });
      }

      await interaction.reply({ content: `✅ ${reloadedCount} comandos recargados exitosamente`, ephemeral: true });
    }

    // ========== RECARGAR EVENTO ESPECÍFICO ==========
    if (subcommand === 'event') {
      const eventName = interaction.options.getString('nombre');
      const eventPath = path.join(__dirname, `../events/${eventName}.js`);

      if (!fs.existsSync(eventPath)) {
        return interaction.reply({ content: `❌ No existe el evento \`${eventName}\``, ephemeral: true });
      }

      delete require.cache[require.resolve(eventPath)];

      try {
        const event = require(eventPath);
        
        interaction.client.removeAllListeners(event.name);

        if (event.once) {
          interaction.client.once(event.name, (...args) => event.execute(...args, interaction.client));
        } else {
          interaction.client.on(event.name, (...args) => event.execute(...args, interaction.client));
        }

        await interaction.reply({ content: `✅ Evento \`${eventName}\` recargado exitosamente`, ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: `❌ Error al recargar \`${eventName}\`:\n\`\`\`${error.message}\`\`\``, ephemeral: true });
      }
    }

    // ========== RECARGAR UTILIDAD ==========
    if (subcommand === 'util') {
      const utilName = interaction.options.getString('nombre');
      const utilPath = path.join(__dirname, `../utils/${utilName}.js`);

      if (!fs.existsSync(utilPath)) {
        return interaction.reply({ content: `❌ No existe el archivo de utilidad \`${utilName}\``, ephemeral: true });
      }

      delete require.cache[require.resolve(utilPath)];

      try {
        require(utilPath);
        await interaction.reply({ content: `✅ Utilidad \`${utilName}\` recargada exitosamente`, ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: `❌ Error al recargar \`${utilName}\`:\n\`\`\`${error.message}\`\`\``, ephemeral: true });
      }
    }

    // ========== RECARGAR ARCHIVO DE DATOS ==========
    if (subcommand === 'data') {
      const dataName = interaction.options.getString('nombre');
      const dataPath = path.join(__dirname, `../data/${dataName}.js`);

      if (!fs.existsSync(dataPath)) {
        return interaction.reply({ content: `❌ No existe el archivo de datos \`${dataName}\``, ephemeral: true });
      }

      delete require.cache[require.resolve(dataPath)];

      try {
        require(dataPath);
        await interaction.reply({ content: `✅ Archivo de datos \`${dataName}\` recargado exitosamente`, ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: `❌ Error al recargar \`${dataName}\`:\n\`\`\`${error.message}\`\`\``, ephemeral: true });
      }
    }
  },
};