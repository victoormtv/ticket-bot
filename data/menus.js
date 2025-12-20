const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

function createMenu(options, placeholder = 'Selecciona un plan', customId = 'ticket-create') {
    return new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setPlaceholder(placeholder)
            .setMaxValues(1)
            .setMinValues(1)
            .setCustomId(customId)
            .addOptions(options)
    );
}

module.exports = {
    menuTicketGeneral: createMenu([
        { label: 'Soporte', emoji: '<:soporte:1316171273901965412>', description: 'Solicita atención personalizada', value: 'soporte-ticket' },
        { label: 'Dudas', emoji: '<:duda:1316171766191624292>', description: 'Solicita Información', value: 'dudas-ticket' },
        { label: 'Adquirir un Producto', emoji: '<:compra:1316171968717918379>', description: 'Realiza una compra', value: 'compra-ticket' }
    ], 'Selecciona una opción'),

    menuPanelFull: createMenu([
        { label: 'Panel Full Semanal', description: 'Precio: $ 25.00 | S/. 60.00', value: 'panel-full-semanal' },
        { label: 'Panel Full Mensual', description: 'Precio: $ 40.00 | S/. 110.00', value: 'panel-full-mensual' },
        { label: 'Panel Full Trimestral', description: 'Precio: $ 50.00 | S/. 150.00', value: 'panel-full-trimestral' },
        { label: 'Panel Full Anual', description: 'Precio: $ 65.00 | S/. 200.00', value: 'panel-full-anual' }
    ], 'Selecciona un plan'),
    
    menuPanelBasic: createMenu([
        { label: 'Panel Basic Semanal', description: 'Precio: $ 11.00 | S/. 40.00', value: 'basic-semanal' },
        { label: 'Panel Basic Mensual', description: 'Precio: $ 22.00 | S/. 80.00', value: 'basic-mensual' },
        { label: 'Panel Basic Trimestral', description: 'Precio: $ 32.00 | S/. 120.00', value: 'basic-trimestral' },
        { label: 'Panel Basic Anual', description: 'Precio: $ 40.00 | S/. 150.00', value: 'basic-anual' }
    ], 'Selecciona un plan'),

    menuBypassId: createMenu([
        { label: 'Bypass ID Semanal', description: 'Precio: $ 10.00 | S/. 40.00', value: 'bypass-id-semanal' },
        { label: 'Bypass ID 14 días', description: 'Precio: $ 20.00 | S/. 70.00', value: 'bypass-id-catorce-dias' },
        { label: 'Bypass ID 30 días', description: 'Precio: $ 30.00 | S/. 100.00', value: 'bypass-id-mensual' },
        { label: 'Bypass ID 60 días', description: 'Precio: $ 45.00 | S/. 150.00', value: 'bypass-id-sesenta-dias' }
    ], 'Selecciona un plan'),

    menuPanelOnlyAimbot: createMenu([
        { label: 'Panel Only Aimbot Semanal', description: 'Precio: $ 6.00 | S/. 20.00', value: 'panel-only-aimbot-semanal' },
        { label: 'Panel Only Aimbot Mensual', description: 'Precio: $ 15.00 | S/. 55.00', value: 'panel-only-aimbot-mensual' },
        { label: 'Panel Only Aimbot Trimestral', description: 'Precio: $ 25.00 | S/. 90.00', value: 'panel-only-aimbot-trimestral' },
        { label: 'Panel Only Aimbot Anual', description: 'Precio: $ 30.00 | S/. 130.00', value: 'panel-only-aimbot-anual' }
    ], 'Selecciona un plan'),

    menuChams: createMenu([
        { label: 'Menu Chams Semanal', description: 'Precio: $ 5.00 | S/. 25.00', value: 'chams-semanal' },
        { label: 'Menu Chams Mensual', description: 'Precio: $ 15.00 | S/. 50.00', value: 'chams-mensual' },
        { label: 'Menu Chams Trimestral', description: 'Precio: $ 20.00 | S/. 70.00', value: 'chams-trimestral' },
        { label: 'Menu Chams Anual', description: 'Precio: $ 25.00 | S/. 90.00', value: 'chams-anual' }
    ], 'Selecciona un plan'),

    menuBypassApk: createMenu([
        { label: 'Bypass APK Semanal', description: 'Precio: $ 15.00 | S/. 60.00', value: 'bypass-apk-semanal' },
        { label: 'Bypass APK 14 días', description: 'Precio: $ 20.00 | S/. 80.00', value: 'bypass-apk-14-dias' },
        { label: 'Bypass APK Mensual', description: 'Precio: $ 35.00 | S/. 130.00', value: 'bypass-apk-mensual' },
        { label: 'Bypass APK Trimestral', description: 'Precio: $ 50.00 | S/. 180.00', value: 'bypass-apk-trimestral' },
    ], 'Selecciona un plan'),

     menuPanelIOS: createMenu([
        { label: 'Panel iOS por 24 horas', description: 'Precio: $ 15.00 | S/. 55.00', value: 'panel-ios-24-horas' },
        { label: 'Panel iOS por 1 semana', description: 'Precio: $ 30.00 | S/. 100.00', value: 'panel-ios-1-semana' },
        { label: 'Panel iOS por 1 mes', description: 'Precio: $ 50.00 | S/. 180.00', value: 'panel-ios-1-mes' },
    ], 'Selecciona un plan'),

    menuAimbotBodyIOS: createMenu([
        { label: 'Aimbot Body por Temporada', description: 'Precio: $ 65.00 | S/. 200.00', value: 'aimbot-body-ios' }
    ], 'Selecciona un plan'),

    menuPanelAndroid: createMenu([
        { label: 'Panel Android Semanal', description: 'Precio: $ 15.00 | S/. 60.00', value: 'panel-android-semanal' },
        { label: 'Panel Android Mensual', description: 'Precio: $ 35.00 | S/. 130.00', value: 'panel-android-mensual' },
        { label: 'Panel Android Trimestral', description: 'Precio: $ 50.00 | S/. 150.00', value: 'panel-android-trimestral' },
        { label: 'Panel Android Anual', description: 'Precio: $ 60.00 | S/. 200.00', value: 'panel-android-anual' }
    ], 'Selecciona un plan'),

     menuAimlock: createMenu([
        { label: 'Aimlock Anual', description: 'Precio: $ 50.00 | S/. 180.00', value: 'aimlock' }
    ], 'Selecciona un plan'),

    menuRegedit: createMenu([
        { label: 'Regedit Mensual', description: 'Precio: $ 25.00 | S/. 80.00', value: 'Regedit-mensual' },
        { label: 'Regedit Anual', description: 'Precio: $ 35.00 | S/. 130.00', value: 'Regedit-anual' }
    ], 'Selecciona un plan'),

     menuPanelAimbotColor: createMenu([
        { label: 'Aimbot Color Mensual', description: 'Precio: $ 25.00 | S/. 90.00', value: 'aimbot-color-mensual' },
        { label: 'Aimbot Color Trimestral', description: 'Precio: $ 50.00 | S/. 180.00', value: 'aimbot-color-trimestral' },
        { label: 'Aimbot Color Anual', description: 'Precio: $ 90.00 | S/. 300.00', value: 'aimbot-color-anual' }
    ], 'Selecciona un plan'),

    menuSpoofer: createMenu([
        { label: 'Spoofer Permanente', description: 'Precio: $ 50.00 | S/. 200.00', value: 'spoofer-permanente' }
    ], 'Selecciona un plan'),

    menuBoostRank: createMenu([
        { label: 'Boost Rank', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta tu rango a preferencia', value: 'boost-rank' }
    ], 'Selecciona tu opción'),

     menuPanelWarzone: createMenu([
        { label: 'Panel Warzone 15 días', description: 'Precio: $ 30.00 | S/. 110.00', value: 'panel-warzone-quince-dias' },
        { label: 'Panel Warzone 30 días', description: 'Precio: $ 65.00 | S/. 200.00', value: 'panel-warzone-treinta-dias' }
    ], 'Selecciona un plan'),

    menuNitroBooster: createMenu([
        { label: 'Discord Nitro x1 año', description: 'Precio: $ 60.00 | S/. 240.00', value: 'nitro-1-año' },
        { label: '14 Boost x1 mes', description: 'Precio: $ 30.00 | S/. 110.00', value: '14-boost-x1-mes' },
        { label: '14 Boost x3 mes', description: 'Precio: $ 60.00 | S/. 240.00', value: '14-boost-x3-mes' }
    ], 'Selecciona un plan'),

    menuPayment: createMenu([
        { label: 'Métodos de Pago de Perú', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'metodos-peru' },
        { label: 'Métodos de Pago Internacionales', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'metodos-internacionales' },
    ], 'Consulta LOS Medios de Pago'),

    menuWallpapers: createMenu([
        { label: 'Wallpaper Mobile', emoji: '<:Mobile56:1316621862255460373>', description: 'Descarga nuestro Wallpaper para Celular', value: 'wallpaper-movil' },
        { label: 'Wallpaper PC', emoji: '<:pee51:1316621863794774098>', description: 'Descarga nuestro Wallpaper para PC', value: 'wallpaper-pc' },
        { label: 'Wallpaper PC Animado', emoji: '<:pee51:1316621863794774098>', description: 'Descarga nuestro Wallpaper Animado para PC', value: 'wallpaper-animado-pc' }
    ], 'Elige un Wallpaper'),

    menuFullInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-full-info' }
    ], 'Consultas aquí'),

    menuSecureInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-secure-info' }
    ], 'Consultas aquí'),

    menuSupremeInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-supreme-info' }
    ], 'Consultas aquí'),

    menuOnlyAimbotInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-only-aimbot-info' }
    ], 'Consultas aquí'),

    menuChamsInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-chams-info' }
    ], 'Consultas aquí'),

    menuBypassApkInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-bypass-apk-info' }
    ], 'Consultas aquí'),

    menuBypassInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-bypass-apk-info' }
    ], 'Consultas aquí'),

    menuPaneliOSInfo: createMenu([
        { label: 'Consulta aquí', emoji: '<:HyperVZeus1:1326269368291688479>', description: 'Consulta aquí', value: 'consulta-ventas' }
    ], 'Consultas aquí'),

};