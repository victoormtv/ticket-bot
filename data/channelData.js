const { EmbedBuilder } = require('discord.js');
const menus = require('./menus');
const config = require('./config');
const liston = '<:linea:1432870878382653530>'.repeat(22) + '\n\n';
const ids = require('./ids');
const { roles } = require('../data/ids');

module.exports = [
    {
        id: ids.embeds.TICKET_GENERAL,
        messageId: '1430729743111819304',
        embed: new EmbedBuilder()
            .setTitle('> Ticket General') // ticket general
            .setDescription(
                "<:HyperVZeus1:1326269368291688479> **Instrucciones para Abrir un Ticket**\n\n" +
                "Para facilitar la realización de una compra o para hacer una consulta relacionada con el producto, te invitamos a abrir un ticket. Este proceso nos permitirá atender tus necesidades de manera más eficiente y brindarte la asistencia adecuada. \n\n" +
                "Asegúrate de incluir todos los detalles relevantes en tu solicitud para que podamos ayudarte de la mejor manera posible. ¡Estamos aquí para ayudarte!\n\n" +
                "<a:1_:1157447561339215963> Elige un producto en nuestras categorías de la HyperV Shop.\n" +
                "<a:2_:1157447558713581678> Selecciona una opción de nuestro menú de precios.\n" +
                "<a:3_:1157447554645102643> Se abrirá un Ticket y un <@&1117939958653649027> se encargará de atenderte.\n\n" +
                "__**VENTAJAS:**__\n" +
                "<:Captura9:1316483320053366814> Compra rápida y segura <:compra:1316171968717918379>\n" +
                "<:Captura9:1316483320053366814> Garantía de productos <:garantia:1321973733971333150>\n" +
                "<:Captura9:1316483320053366814> Soporte 24/7 disponible <:support1:1321973732193075362>\n\n" +
                "<a:ss:1117992086642364487> Recuerda realizar tu compra solo con un <@&1117939958653649027>.\n\n" +
                liston +
                ":flag_us: **Instructions for Opening a Ticket**\n\n" +
                "To facilitate the completion of a purchase or to make an inquiry related to the product, we invite you to open a ticket. This process will allow us to address your needs more efficiently and provide you with the appropriate assistance. \n\n" +
                "Make sure to include all relevant details in your request so we can assist you in the best possible way. We are here to help you!\n\n" +
                "<a:1_:1157447561339215963> Choose a product from our HyperV Shop categories.\n" +
                "<a:2_:1157447558713581678> Select an option from our pricing menu.\n" +
                "<a:3_:1157447554645102643> A Ticket will be opened, and an <@&1117939958653649027> will assist you.\n\n" +
                "__**ADVANTAGES:**__\n" +
                "<:Captura9:1316483320053366814> Fast and secure purchase <:compra:1316171968717918379>\n" +
                "<:Captura9:1316483320053366814> Product warranty <:garantia:1321973733971333150>\n" +
                "<:Captura9:1316483320053366814> 24/7 support available <:support1:1321973732193075362>\n\n" +
                "<a:ss:1117992086642364487> Remember to make your purchase only with a <@&1117939958653649027>")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage(config.defaultImage),
        menu: menus.menuTicketGeneral
    },

    {
        id: ids.embeds.PANEL_FULL, // Panel Full
        messageId: '1430729743937831073',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Full')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro Panel Full ofrece a sus usuarios funciones completamente seguras y sin restricciones en los modos del juego, proporcionando todas las funcionalidades disponibles en el mundo de che4ts. Además, incluye configuraciones de stream diseñadas para creadores de contenido.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: Our Full Panel offers its users completely safe and unrestricted features in the game modes, providing all the functionalities available in the world of che4ts. In addition, it includes stream settings designed for content creators.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Idioms: English/Spanish/Portugués`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/6cQzqksm/PANEL-FULL-DC-HYPER-V.png'),
        menu: menus.menuPanelFull
    },

    {
        id: ids.embeds.PANEL_BASIC, // panel basic
            messageId: '1430729744076378124',
        embed: new EmbedBuilder()
                .setTitle('> HyperV - Panel Secure')
                .setDescription(
                    "<a:spain:1117992165470122064> Nuestro Panel Secure ofrece a sus usuarios funciones BÁSICAS completamente seguras y sin ningún tipo de restricción en los modos del juego. Además, cuenta con las mismas configuraciones de stream que el Panel Full, diseñadas para creadores de contenido.\n\n" +
                    "__**DETALLES:**__\n" +
                    "`- Soporte Windows: 8/10/11`\n" +
                    "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                    "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                    liston +
                    ":flag_us: Our Secure Panel offers its users completely safe BASIC features without any restrictions in the game modes. In addition, it has the same stream settings as the Full Panel, designed for content creators.\n\n" +
                    "__**DETAILS:**__\n" +
                    "`- Support Windows: 8/10/11`\n" +
                    "`- Support CPU: Intel/AMD/Xeon`\n" +
                    "`- Support Idioms: English/Spanish/Portugués`"
                )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/pj1bfvQB/PANEL-SECURE-HYPER-V.png '),
        menu: menus.menuPanelBasic 
    },
    
    {
        id: ids.embeds.PANEL_ONLY_AIMBOT, // panel only aimbot
        messageId: '1430729745712287756',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Only Aimbot')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro Panel Only Aimbot está diseñado específicamente para aquellos que buscan un autoapuntado eficaz, sin funciones adicionales que compliquen la experiencia. Incluye, como características extra, fake lag y clip lag, herramientas esenciales para enfrentar a enemigos en duelos 1vs1.\n\n" +
                "Al igual que nuestros otros productos, este panel es completamente seguro para su uso en cuentas principales, garantizando una experiencia de juego óptima y sin riesgos.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                "<a:eeuu:1117992163658170448> Our Panel Only Aimbot is specifically designed for those seeking effective aimbot functionality without additional features that complicate the experience. It includes, as extra features, fake lag and clip lag, essential tools for facing enemies in 1v1 duels.\n\n" +
                "Like our other products, this panel is completely safe for use on main accounts, ensuring an optimal and risk-free gaming experience.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Windows Support: 8/10/11`\n" +
                "`- CPU Support: Intel/AMD/Xeon`\n" +
                "`- Language Support: English/Spanish/Portuguese`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/YBBZRRPv/ONLY-BOT-DC-1-HYPER-V.png'),

        menu: menus.menuPanelOnlyAimbot
    },

    {
        id: ids.embeds.CHAMS_PC, // menu chams
        messageId: '1430729747285020765',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Menu Chams')
            .setDescription(
                "<a:spain:1117992165470122064> Menu Chams -Esp está diseñado especialmente para jugadores que desean detectar a sus enemigos a través de las estructuras sin riesgo de ser baneados. \n\n" +
                "**Caracteristicas destacadas**\n" +
                "**- Modo Streamer:**Esta función permite ocultar los elementos visuales durante transmisiones en vivo o grabaciones, asegurando que tu experiencia de juego se mantenga privada y profesional.\n" +
                "**- Seguridad Garantizada:** Al igual que nuestros otros productos, este menú es completamente seguro para su uso en cuentas principales, lo que garantiza una experiencia de juego óptima y sin riesgos. \n\n" +
                "Disfruta de una ventaja competitiva sin comprometer la integridad de tu cuenta. \n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n" +
                "`- Compatibilidad: Emuladores de 32/64 bits.`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Menu Chams - Esp is designed specifically for players who want to detect enemies through structures without the risk of being banned.\n\n" +
                "**Highlighted Features**\n" +
                "**- Streamer Mode:** This feature allows you to hide visual elements during live streams or recordings, ensuring your gaming experience remains private and professional.\n" +
                "**- Guaranteed Safety:** Like our other products, this menu is completely safe for use on main accounts, ensuring an optimal and risk-free gaming experience. \n\n" +
                "Enjoy a competitive edge without compromising your account's integrity.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Idioms: English/Spanish/Portuguese`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/0v2fDmh/CHAMS-ESP-HYPER-V-1.png'),

        menu: menus.menuChams
    },

    {
        id: ids.embeds.BYPASS_ID, // bypass id
        messageId: '1435051762234163240',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Bypass ID')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro bypass UID proporciona a los usuarios una solución efectiva para emparejarse con teléfonos a través del ID de la cuenta, eliminando las restricciones en los modos de juego. Permite disfrutar al máximo de la experiencia sin comprometer el rendimiento. Es compatible con sistemas de 32 y 64 bits, lo que lo convierte en la mejor opción para emparejarse con hasta 50 jugadores. Además de esto recordar que este producto dispone un soporte de compatiblidad con FF MAX y FF normal.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n" +
                "`- Soporte de emparejamiento: FF MAX y FF Normal`\n" +
                "`- Compatibilidad: Emuladores 64 bits`\n\n" +
                liston +
                ":flag_us: Our UID bypass provides users with an effective solution for pairing with phones via account ID, eliminating restrictions on game modes. It allows you to fully enjoy the experience without compromising performance. It's compatible with both 32-bit and 64-bit systems, making it the best option for pairing with up to 50 players. Additionally, this product supports compatibility with FF Max and normal FF.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Idioms: English/Spanish/Portugués`\n" +
                "`- Support Pairing: FF MAX and FF Normal`\n" +
                "`- Compatibility: Emulators 64 bits`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/NkMXChs/DISCORD-ID-BYPASS-1.png'),

        menu: menus.menuBypassId
    },

    {
        id: ids.embeds.BYPASS_APK, // bypass apk
        messageId: '1430729748832714773',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Bypass APK')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro bypass APK proporciona a los usuarios una solución efectiva para emparejarse con teléfonos, eliminando las restricciones en los modos de juego. Permite disfrutar al máximo de la experiencia sin comprometer el rendimiento. Es compatible con sistemas de 32 y 64 bits, lo que lo convierte en la mejor opción para emparejarse con hasta 50 jugadores.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n" +
                "`- Compatibilidad: Emuladores 32 bits y 64 bits`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Our bypass APK provides users with an effective solution to matchmaking with phones, removing restrictions on game modes. It allows you to enjoy the experience to the fullest without compromising on performance. It supports both 32-bit and 64-bit systems, making it the best choice for matchmaking with up to 50 players.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Idioms: English/Spanish/Portuguese`\n" +
                "`- Compatibility: Emuladores 32 bits y 64 bits`\n\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/RGmp4QXr/DISCORD-APK-BYPASS-1.png'),

        menu: menus.menuBypassApk
    },

    {
        id: ids.embeds.PANEL_IOS, // panel ios
        messageId: '1430729749801467924',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel iOS')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro panel de iOS ofrece a sus usuarios funciones de aimbot y visuales que garantizan partidas seguras sin restricciones en los modos de juego. Además, cuenta con compatibilidad total con todas las versiones del sistema iOS.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Sistema: iOS`\n" +
                "`- Soporte Versión del sistema: Todas`\n" +
                "`- Soporte de instalación: Incluye certificado de GBOX y no necesitas ningun dispositivo ni PC extra.`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: Our iOS dashboard offers users aimbot and visual features that ensure safe, unrestricted gameplay across all game modes. It also boasts full compatibility with all iOS versions.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support System: iOS`\n" +
                "`- Support System version: All`\n" +
                "`- Installation support: Includes GBOX certificate and you don't need any extra devices or PCs.`\n" +
                "`- Support Idioms: English/Spanish/Portugués`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/zVMKnXx2/PANEL-IOS-DC-HYPER-V.png'),
        menu: menus.menuPanelIOS
    },

    {
        id: ids.embeds.AIMBOT_BODY_IOS, // aimbot body ios
        messageId: '1436783769813123165',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Aimbot Body')
            .setDescription(
                "<a:spain:1117992165470122064> Presentamos nuestro nuevo Aim Assist mediante Jailbreak, obtendrás una victoria asegurada sin bug de daño en tu dispositivo iOS, destacando que es para todas las versiones, además de ofrecerte seguridad y garantía para todas tus cuentas.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Sistema: iOS`\n" +
                "`- Soporte Versión del sistema: Todas`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: We present our new Aim Assist through Jailbreak, you will obtain a guaranteed victory without a damage bug on your iOS device, highlighting that it is for all versions, in addition to offering you security and guarantee for all your accounts.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support System: iOS`\n" +
                "`- Support System version: All`\n" +
                "`- Support Idioms: English/Spanish/Portugués`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/fY5MmBNq/AIMBOT-IOS-BODY-1.png'),
        menu: menus.menuAimbotBodyIOS
    },
    
    {
        id: ids.embeds.AIMLOCK,
        messageId: '1430729751449829377',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Aimlock') // aimlock
            .setDescription(
                "<a:spain:1117992165470122064> Presentamos nuestro nuevo Aimlock sin necesidad de jailbreak, con el cual obtendrás una victoria asegurada sin bug de daño. Este Aimlock destaca por ser compatible con todas las versiones existentes, además de ofrecerte seguridad y garantía para todas tus cuentas.\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Sistema: Android y iOS`\n" +
                "`- Soporte Versión del sistema: Todas`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> We present our new Aimlock without the need for jailbreak, with which you will obtain a guaranteed victory without a damaging bug. This Aimlock stands out for being compatible with all existing versions, in addition to offering you security and guarantee for all your accounts.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support System: Android and iOS`\n" +
                "`- Support System version: Everything.`\n" +
                "`- Support Idioms: English/Spanish/Portuguese`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/bj4C14xv/AIMLOCK-DC-HYPER-V-1.png'),

        menu: menus.menuAimlock
    },

    {
        id: ids.embeds.REGEDIT, // regedit
        messageId: '1430729752955846728',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Regedit')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro regedit te ofrece corregir la mira perfectamente, ahorrándote así largas horas probando nuevas configuraciones que nunca te funcionan, de esta manera llevarás tu jugabilidad al siguiente nivel!\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Sistema: Android and iOS`\n" +
                "`- Soporte CPU: Todos compatibles`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: Our regedit offers you to fix your crosshair perfectly, saving you hours of trying new settings that never work, and taking your gameplay to the next level!\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support System: Android and iOS`\n" +
                "`- Support CPU: All compatible`\n" +
                "`- Support Idioms: English/Spanish/Portuguese`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/5XDYBnyv/HYPER-V-REGEDIT-1.png'),

        menu: menus.menuRegedit
    },

    // ******************************
    // ******PRODUCTOS VALORANT******
    // ******************************

    {
        id: '1399913608283951325', // aimbot color
        messageId: '1430729753526272114',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Aimbot Color')
            .setDescription(
                "<a:spain:1117992165470122064> Disfruta de un autoapuntado completamente externo que garantiza tu victoria en cada partida. Con este aimbot, podrás ascender hasta el elo de tu preferencia sin preocuparte por el riesgo de baneo.\n\n" +
                "**Características:**\n" +
                "- **Trigger Bot:** Activa automáticamente el disparo al apuntar.\n" +
                "- **Solo Horizontal:** Optimizado para mejorar tu precisión en movimientos horizontales.\n" +
                "- **A prueba de transmisiones (stream proof):** Perfecto para jugadores que transmiten en vivo.\n" +
                "- **Aimbot Humanizado:** Proporciona un estilo de apuntado más natural y menos detectable.\n" +
                "- **Asistencia de Apuntado (on/off):** Personaliza tu experiencia según tus necesidades. \n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: Enjoy a fully external aimbot that guarantees your victory in every match. With this aimbot, you can climb to your preferred rank without worrying about the risk of being banned.\n\n" +
                "**Features:**\n" +
                "- **Trigger Bot:** Automatically activates shooting when aiming.\n" +
                "- **Horizontal Only:** Optimized to improve your accuracy in horizontal movements.\n" +
                "- **Stream Proof:** Perfect for players who stream live.\n" +
                "- **Humanized Aimbot:** Provides a more natural and less detectable aiming style.\n" +
                "- **Aiming Assistance (on/off):** Customize your experience based on your needs.\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Idioms: English/Spanish/Portugués`\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/XrBS87Nh/COLOR-AIMBOT-HYPER-V-1.png'),

        menu: menus.menuPanelAimbotColor
    },

    {
        id: ids.embeds.SPOOFER, // spoofer
        messageId: '1430729754360938527',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Spoofer')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestro Spoofer te ayudará a falsificar las características del HWID, de esta forma te quitarás el baneo de Hardware que te dan algunos juegos.\n\n" +
                "__**SOPORTE:**__\n" +
                "`- Fortnite`\n" +
                "`- Rust`\n" +
                "`- Apex`\n" +
                "`- Dayz`\n" +
                "`- Valorant`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Our Spoofer will help you falsify the HWID characteristics, this way you will get rid of the hardware ban that some games give you.\n\n" +
                "__**SUPPORT:**__\n" +
                "`- Fortnite`\n" +
                "`- Rust`\n" +
                "`- Apex`\n" +
                "`- Dayz`\n" +
                "`- Valorant`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/CpNS2H55/SPOOFER-HYPER-V-1-1.png'),

        menu: menus.menuSpoofer
    },

    {
        id: ids.embeds.BOOST_RANK, // boost rank
        messageId: '1430729755061129276',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Boost Rank')
            .setDescription(
                "<a:spain:1117992165470122064> **¿Estás listo para dejar atrás tus límites actuales?**\n" +
                "Ofrecemos servicios de boosteo personalizados en Valorant, permitiéndote alcanzar el rango que siempre has querido.Te garantizamos un ascenso rápido y seguro.\n\n" +
                "**¿Qué Ofrecemos?**\n" +
                "**Boosteo Personalizado:** Escoge el rango al que deseas llegar y nosotros te ayudamos a alcanzarlo.\n" +
                "**Total Seguridad:** Tu cuenta estará protegida, garantizando un servicio confiable y discreto.\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> **Are you ready to return to your current limits?**\n" +
                "We offer personalized boosting services in Valorant, allowing you to reach the rank you've always wanted. We guarantee a fast and safe promotion.\n\n" +
                "**What Do We Offer?**\n"+
                "**Custom Boost:** Choose the rank you want to reach and we'll help you get there.\n" +
                "**Total Security:** Your account will be protected, guaranteeing a reliable and discreet service.\n\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/7t5BnmxR/BOOST-RANK-2-1.png'),

        menu: menus.menuBoostRank
    },

    {
        id: ids.embeds.PANEL_WARZONE, // panel warzone
        messageId: '1448864192999198730',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Warzone')
            .setDescription(
                "<a:spain:1117992165470122064> Descubre el Panel Warzone, la herramienta definitiva para llevar tu experiencia de juego al siguiente nivel. Diseñado para ser compatible con plataformas populares como Xbox, Steam y BattleNet, este panel ofrece una amplia gama de funciones para mejorar tu rendimiento en el juego.\n\n" +
                "**Funciones Avanzadas:**\n" +
                "- **Aimbot:** Mejora tu precisión con un sistema de apuntado automático.\n" +
                "- **Silent Aim:** Dispara sin que los enemigos se den cuenta, manteniendo tu posición oculta.\n" +
                "- **Triggerbot:** Dispara automáticamente cuando el enemigo está en tu mira.\n" +
                "- **FOV (Field of View):** Ajusta el campo de visión para detectar enemigos más fácilmente.\n" +
                "- **Parts Section:** Personaliza tu configuración para adaptarse a tu estilo de juego.\n" +
                "- **ESP (Extra Sensory Perception) y Hologramas:** Visualiza la ubicación de los enemigos a través de paredes y obstáculos, aumentando tus posibilidades de supervivencia.\n\n"+
                "**Caracteristicas Destacadas:**\n" +
                "- **Coches y Armas:** Accede a vehículos y armas de manera estratégica para dominar el campo de batalla.\n" +
                "- **Desbloqueos Exclusivos:** camos, Armas, Operadores, Banners, etc. Obtén acceso a elementos exclusivos y personaliza tu experiencia de juego como nunca antes.\n" +
                "- **Aimbot:** Mejora tu precisión con un sistema de apuntado automático.\n\n" +
                "Con el Panel Warzone, no solo mejorarás tu habilidad en el juego, sino que también disfrutarás de una experiencia más rica y emocionante. ¡Prepárate para conquistar el campo de batalla!\n\n" +
                "__**DETALLES:**__\n" +
                "`- Compatibilidad: Xbox, Steam, BattleNet`\n" +
                "`- Soporte Windows: 8/10/11`\n" +
                "`- Soporte CPU: Intel/AMD/Xeon`\n" +
                "`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                ":flag_us: Discover the Warzone Panel, the ultimate tool to take your gaming experience to the next level. Designed to be compatible with popular platforms like Xbox, Steam, and BattleNet, this panel offers a wide range of features to enhance your in-game performance.\n\n" +
                "**Advanced Features:**\n" +
                "- **Aimbot:** Improve your accuracy with an automatic aiming system.\n" +
                "- **Silent Aim:** Shoot without enemies noticing, keeping your position hidden.\n" +
                "- **Triggerbot:** Automatically shoot when the enemy is in your sights.\n" +
                "- **FOV (Field of View):** Adjust the field of vision to detect enemies more easily.\n" +
                "- **Parts Section:** Customize your settings to match your playstyle.\n" +
                "- **ESP (Extra Sensory Perception) and Holograms:** Visualize enemy locations through walls and obstacles, increasing your chances of survival.\n\n" +
                "**Highlighted Features:**\n" +
                "- **Cars and Weapons:** Access vehicles and weapons strategically to dominate the battlefield.\n" +
                "- **Exclusive Unlocks:** Camos, Weapons, Operators, Banners, etc. Gain access to exclusive items and customize your gaming experience like never before.\n" +
                "- **Aimbot:** Improve your accuracy with an automatic aiming system.\n\n" +
                "With the Warzone Panel, you will not only enhance your gaming skills but also enjoy a richer and more exciting experience. Get ready to conquer the battlefield!\n\n" +
                "__**DETAILS:**__\n" +
                "`- Compatibility: Xbox, Steam, BattleNet`\n" +
                "`- Support Windows: 8/10/11`\n" +
                "`- Support CPU: Intel/AMD/Xeon`\n" +
                "`- Support Languages: English/Spanish/Portuguese`\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/V0czTzxD/WARZONE-HYPER-V-1.png'),

        menu: menus.menuPanelWarzone
    },

    {
        id: ids.embeds.NITRO, // discord nitro
        messageId: '1436180031599677481',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Discord Tools')
            .setDescription(
                "<a:spain:1117992165470122064> Nuestras promociones de Discord Tools te permiten acceder a los productos por un menor precio y de forma segura y accesible.\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Our Discord Tools promotions allow you to access products at a lower price in a safe and affordable way.\n\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/sp2s4bjG/DISCORD-TOOLS-HYPER-V.png'),

        menu: menus.menuNitroBooster
    },

    {
        id: ids.embeds.WEBSITE, // website
        messageId: '1437816969192800358',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - WebSite')
            .setDescription(
                "<a:spain:1117992165470122064> ¡Descubre todo lo que HyperV tiene para ofrecerte! Visita nuestra página web [hyperv.store](https://hyperv.store) y explora nuestra amplia gama de productos y servicios. Desde paneles exclusivos hasta soporte personalizado, tenemos todo lo que necesitas para mejorar tu experiencia. ¡No pierdas la oportunidad de ser parte de nuestra comunidad! Visítanos ahora y haz tu compra de manera segura y rápida.\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Discover everything HyperV has to offer! Visit our website [hyperv.store](https://hyperv.store) and explore our wide range of products and services. From exclusive panels to personalized support, we have everything you need to enhance your experience. Don't miss the opportunity to be part of our community! Visit us now and make your purchase securely and quickly.\n\n"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/ZpXMbZWC/PAGINA-WEB-DC-1.png'),

        menu: menus.menuWebSite
    },

    {
        id: ids.embeds.PAYMENT, // metodos de pago
        messageId: '1437816969972813868',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Payment')
            .setDescription(
                "<a:spain:1117992165470122064> Conoce los métodos de pago disponibles para realizar tus compras de forma segura y rápida. Ofrecemos diversas opciones para adaptarnos a tus necesidades.\n\n__**DETALLES:**__\n`- Métodos: Tarjetas, Criptomonedas, Transferencias, Billeteras Digitales Nacionales e Internacionales`\n`- Soporte Idiomas: Inglés/Español/Portugués`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Learn about the available payment methods to make your purchases securely and quickly. We offer various options to suit your needs.\n\n__**DETAILS:**__\n`- Methods: Cards, Cryptocurrencies, Bank Transfers, National and International Wallets`\n`- Support Idioms: English/Spanish/Portuguese`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/7xfqdQhg/METODOS-DE-PAGO-DC-1.png'),

        menu: menus.menuPayment
    },

    {
        id: ids.embeds.POLICIES, // politicas
        messageId: '1437816971512119420',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Políticas')
            .setDescription(
                "<a:spain:1117992165470122064> Estas son nuestras políticas actualizadas para los usuarios y compradores de este servidor:\n" +
                "https://hyperv.store/legal/terms\n" +
                "https://hyperv.store/legal/privacy\n" +
                liston +
                "<a:eeuu:1117992163658170448> These are our updated policies for users and buyers of this server:\n" +
                "https://hyperv.store/legal/terms\n" +
                "https://hyperv.store/legal/privacy"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/WZ1k8Cm/TYC-PAGINA-DC-1.png'),
    },

    {
        id: ids.embeds.WALLPAPERS, // wallpapers
        messageId: '1430729759436046337',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Wallpapers')
            .setDescription(
                "<a:spain:1117992165470122064> ¡Descarga cualquiera de nuestros Wallpapers para mobile o computador aquí!\n\n" +
                "__**DETALLES:**__\n" +
                "`- Soporte Sistema: Android, iOS y Windows`\n" +
                "`- Soporte Resolución: 1080 y 1920x1080`\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Download any of our Wallpapers for mobile or computer here!\n\n" +
                "__**DETAILS:**__\n" +
                "`- Support System: Android, iOS and Windows`\n" +
                "`- Support Resolution: 1080 and 1920x1080`"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage(config.defaultImage),

        menu: menus.menuWallpapers
    },

    {
        id: ids.embeds.SOCIAL_NETWORKS, // SOCIAL NETWORKS ID
        messageId: '1436173425847697449',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Social Networks')
            .setDescription(
                "<a:spain:1117992165470122064> ¡Conéctate con nosotros! Te invitamos a seguirnos en nuestras redes sociales, donde podrás estar al tanto de nuestras últimas novedades, promociones exclusivas y contenido interesante. Encuentra todos nuestros perfiles aquí abajo y únete a nuestra comunidad. ¡Te esperamos!\n\n" +
                "**Descubre la Tienda Online**: [HyperV Store](https://hyperv.store)\n" +
                "**Síguenos en Instagram**: [@h1perv](https://www.instagram.com/h1perv/)\n" +
                "**Visita nuestro TikTok**: [@hypervgg](https://www.tiktok.com/@hypervgg)\n\n" +
                liston +
                "<a:eeuu:1117992163658170448> Connect with us! We invite you to follow us on our social networks, where you can keep up to date with our latest news, exclusive promotions and interesting content. Find all our profiles below and join our community. We look forward to seeing you!\n\n" +
                "**Discover the Online Store**: [HyperV Store](https://hyperv.store)\n" +
                "**Follow us on Instagram**: [@h1perv](https://www.instagram.com/h1perv/)\n" +
                "**Follow us on TikTok**: [@hypervgg](https://www.tiktok.com/@hypervgg)" 
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/vvH0bvnT/rdss-hyp-r-b.png'),
    },

    {
        id: ids.embeds.PAGOS_PERU, // metodos de pago de peru
        messageId: '1430729762355019796',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Métodos de Pago Nacionales <:HyperVZeus1:1326269368291688479>')
            .setDescription("**BCP Soles** <:BCP:1117992075154178150>\n**Número de cuenta:** 47070818592082\n**CCI:** 00247017081859208231\n**Datos:** Carlos Bonifacio Guerra\n\n**Interbank Soles** <:INTERBANK:1117992077939200021>\n**Número de cuenta:** 8983317709473\n**CCI:** 00389801331770947346\n**Datos:** Carlos Bonifacio Guerra\n\n**Interbank Dólares** <:INTERBANK:1117992077939200021>\n**CCI:** 00389801330614896749\n**Datos:** Carlos Bonifacio Guerra\n\n**Scotiabank Soles** <:descarga:1117992071844872232>\n**Número de cuenta:** 1640618284\n**CCI:** 00930120164061828434\n**Datos:** Carlos Bonifacio Guerra\n\n**BBVA Soles** <:bbva:1117992076156612650>\n**Número de cuenta:** 0011-0241-0200790414\nCCI: 011-241-000200790414-73\n**Datos:** Carlos Bonifacio Guerra\n\n**Yape/Plin** <:yape:1117992073887502410>\n925358613\n**Datos:** Carlos Bonifacio Guerra")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
    },

    {
        id: ids.embeds.PAGOS_INTERNACIONALES,
        messageId: '1450539826867605546',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Métodos de Pago Internacionales <:HyperVZeus1:1326269368291688479>')
            .setDescription(
                "**Western Union** <:10892796357553685601:1117992080912945222>\n**Nombres:** Carlos Mario Farid\n**Apellidos:** Bonifacio Guerra\n**DNI:** 76850426\n**Celular:** +51925358613\n**País:** Perú\n**Ciudad:** Pisco\n**Dirección:** Calle los jazmines 341\n**Nota: Indicar que se recibe en dólares. Revise bien los datos, no se podrá devolver el dinero si hay errores.**\n\n" +
                "**Remitly** <:1039637352546578432:1117992079289749566>\n**Indicar que se recibe en dólares**\n**Banco:** INTERBANK\n**Cuenta:** Ahorros dólares\n**Número de cuenta:** 8983306148967\n**Número de identificación:** 76850426\n**Nombre completo:** Carlos Mario Farid\n**Apellido:** Bonifacio\n**Segundo apellido:** Guerra\n**Teléfono:** 925358613\n**País:** Perú\n**Ciudad:** Pisco\n**Región:** Ica\n\n" +
                "**Paypal** <:paypal:1117992083765080144>\n**Correo:** diegohyperv011@gmail.com\n**Mensaje obligatorio al pagar:**\nDeclaro que este dinero enviado desde (NOMBRE DEL TITULAR DEL PAYPAL) hacia Diego Huaca es totalmente legal, y declaro que el pago no es reembolsable bajo ninguna circunstancia. Soy el titular responsable de este envío de USD.\n**Link de Donación:** https://www.paypal.com/donate/?hosted_button_id=V374LDC8RMTKC\n\n" +
                "**Binance** <:5393binancecoin:1117992082699718726>\n**ID:** 218736586\n\n" +
                "**Cash App EEUU** <a:eeuu:1117992163658170448>\nhttps://cash.app/$Jrz1lk7\n\n" +
                "**Nequi Colombia** <:flagcolombia:1232045292887605290>\n3013969801\n**Datos:** Jonatan Perez\n**Tipo de cambio:** 5,000 pesos colombianos = 1 Dólar\n\n" +
                "**Banco estado** <:flagchile:1232045290484404274>\n**Cuenta Rut:** 17388020-0\n**Datos:** Jorge saavedra\n\n" +
                "**MÉTODOS DE MÉXICO** <:flagmexico_1f1f21f1fd:1244856813053284437>\n\n" +
                "**Para transferencias:**\n**Clabe NU (NUBANK)**\n638180010145897670\n**Datos:** Karelys Ferrer\n**Nota:** NO AGREGAR NADA EN EL CONCEPTO\n\n" +
                "**Para depositos:**\n**Spin Oxxo**\n5101 2505 6374 3542 \n**Datos:** Karelys Ferrer\n**Nota:** Si no encuentran Nu en el sistema, puedes decir que se deposita con PESPay.\n\n" +
                "**Tipo de cambio (México)**\n1 Sol = 6,20 MXN\n\n" +
                "**CBU Argentina** <:flagargentina:1232045285241262251>\n1430001713024496140019\n**Datos:** Francisco Vilcavil\n**Tipo de cambio:** 1 sol = 600 pesos + 1900 pesos de comisión\n\n" +
                "**Banrural monetaria - Guatemala <a:guatemala:1449442439277580369>**\n3139173628\n**Datos:** Kimberly Garcia\n\n" +
                "**Banco Pichincha** <:ecuador:1232045296998023260>\n**Cuenta de ahorro transaccional:** 2214588834\n**Datos:** Jostin Stiven Martinez Parrales\n\n" +
                "**Cuenta República Dominicana** <a:rddd:1449442346939973783>\n**Nombre:**Jenny Joselin Rodríguez Castillo\n**Cédula:** 0540131783-8\n\n" +
                "**Cuenta Prex Uruguay**\n**Cuenta:**  22303077\n\n**Nombre:**Luana Esbry\n\n" +
                "**Página Web** <:HyperVZeus1:1326269368291688479>\n**Link:** [hyperv.store](https://hyperv.store)\n**Para compras online internacionales pide el cupón de descuento para los clientes**"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
    },

    {
        id: ids.embeds.BANCO_BOLIVIA, // banco bolivia
        messageId: '1440130376176631919',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Transferencia Bolivia <:HyperVZeus1:1326269368291688479>')
            .setDescription("**Transferencia QR**\n**Banco**: Banco Unión\n**Titular**: Genoveva Mamani\n**Tipo de Cambio:** 10.75 = 1$")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/FFphw2L/image.png')
    },

    {
        id: ids.embeds.ZELLE, // zelle
        messageId: '1437816975601701004',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Zelle <:HyperVZeus1:1326269368291688479>')
            .setDescription("**Nombre:** Cristian Amavizca\n**Numero**: +1 (208) 598-2850")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/pjZYf84n/Captura-de-pantalla-2025-11-17-185041.png')
    },

    {
        id: ids.embeds.WEBSITE_LOGIN, // login website
        messageId: '1430729765547016303',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Website <:HyperVZeus1:1326269368291688479>')
            .setDescription("**PUEDES SOLICITAR UN CUPÓN DE DESCUENTO PERSONALIZADO PARA COMPRAS EN [HyperV Store](https://hyperv.store)**\n\n**Para compras menores a 15 USD**: Descuento de 2 USD\n**Para compras entre 15 USD a 30 usd**: Descuento de 3 USD\n**Para compras de 30 usd a más**: Descuento de 5 USD\n\nSolicita tu cupón a <@!1288338421772849275>")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/V0qnfMdW/WALLPAPER-HYPERV-2.gif')
    },

    {
        id: ids.embeds.LOGIN_VENTAS,
        messageId: '1450949463370633275',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Registro de Ventas')
            .setDescription(
                "Se usará el comando `/venta` **SOLO EN ESTE CANAL** para registrar las ventas de cualquier producto.\n\n" +
                "**DATOS A INGRESAR:**\n" +
                "- Usuario\n" +
                "- Método de Pago\n" +
                "- Producto\n" +
                "- Período\n" +
                "- Precio cobrado\n" +
                "- Moneda\n" +
                "- Soporte\n" +
                "- Comprobante de pago\n" +
                "- WhatsApp (OPCIONAL)\n" +
                "- Nota (OPCIONAL)\n\n" +
                "**CÁLCULO DE PRECIOS, DESCUENTOS Y PROPINAS:**\n" +
                "- El bot calcula automáticamente el monto neto recibido según el método de pago y la moneda.\n" +
                "- Si el precio ingresado es **menor** al precio estándar, se registra como **DESCUENTO** y ajusta **SOLO** la comisión del vendedor.\n" +
                "- Si el precio ingresado es **mayor** al precio estándar, se registra como **PROPINA** y será asignada **ÚNICAMENTE** al vendedor.\n" +
                "- Si el precio ingresado está dentro de un margen pequeño frente al precio estándar, se considera una venta **NORMAL**.\n\n" +
                "<a:_alerta_:1316557202621988915> **IMPORTANTE**:\n" +
                "- Ingresar un precio distinto al comprobante subido será verificado por <@1117934669002965014> y descontará la venta hecha.\n" +
                "- No habrán propinas extras ya que el bot calculará automáticamente el monto que llegó.\n" +
                "- El bot calculará las conversiones de acuerdo a los tipos de cambio de cada país que están indicados en https://discord.com/channels/1117932314102595716/1117939385816580217.\n" +
                "- El bot también calculará el descuento de comisión que hace PayPal y demás métodos de pago.\n" +
                "- El bot actualizará diariamente de acuerdo a **ExchangeRate** según el cambio del resto de países que no tienen un tipo de cambio fijo.\n\n" +
                "**GENERACIÓN AUTOMÁTICA DE LICENCIAS:**\n" +
                "Una vez la venta haya sido registrada, el bot automáticamente responderá tu mensaje con una **Licencia de KeyAuth** (de acuerdo al producto vendido y su duración) para que sea entregada al cliente **SOLO SI <@1117934669002965014> CONFIRMÓ EL PAGO**.\n\n" +
                "**REPORTES MENSUALES:**\n" +
                "Un usuario con rol de **ADMINISTRADOR** podrá usar el comando `/reporte-mensual` para generar un Excel con información completa sobre las ventas.\n\n" +
                "**CONTENIDO DEL REPORTE:**\n" +
                "- Ventas totales\n" +
                "- Ingresos Totales (en soles)\n" +
                "- Total de comisiones por ventas\n" +
                "- Total de comisiones por soporte\n" +
                "- Ventas normales, con descuento y con propina\n" +
                "- Vendedor con más y menos ventas\n" +
                "- Productos más y menos vendidos\n" +
                "- Períodos de productos más y menos vendidos\n" +
                "- Tabla con todas las ventas totales\n" +
                "- Tabla con comisiones y ventas de cada vendedor\n\n" +
                "**ELIMINACIÓN DE VENTAS:**\n" +
                "Para eliminar una venta mal ingresada:\n" +
                "- Opción 1: Borrar el mensaje para que no sea contabilizado\n" +
                "- Opción 2: Usar el comando `/eliminar-venta` y seleccionar el número de venta a eliminar (también deberá borrar su mensaje)\n\n" +
                "<a:_alerta_:1316557202621988915> **COMANDO DISPONIBLE** <a:_alerta_:1316557202621988915>"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
    },

    {
        id: ids.embeds.INFO_COMANDOS,
        messageId: '1450949464125866226',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Comandos')
            .setDescription(
                "<a:_alerta_:1316557202621988915> **COMANDOS DISPONIBLES** <a:_alerta_:1316557202621988915>\n\n" +
                "- Comando `/venta` para registrar las ventas de cualquier producto.\n\n" +
                "- Comando `/precio` para listar los precios de cualquier producto mas sus caracteristicas. Escoger el producto a vender.\n\n" +
                "- Comandos `/carrito`, con las variaciones de los productos (PC, Movil, Discord, Valorant) para agregar un producto al carrito de la pagina y que el cliente compre por ahi. Escoger el producto a vender\n\n" +
                "- Comando `/link` para mostrar el link de un producto de la pagina.\n\n" +
                "- Comando `/instalacion` para mostrar los pasos y requisitos previos de instalacion de productos PC.\n\n" +
                "- Comando `/metodos`, con las variaciones de los paises (Internacional, Peru, Colombia, Chile, etc) para listar los metodos de pago de cada pais. Ejm: `/metodos peru`\n\n" +
                "- Comando `/datos`, con las variaciones del pais y metodos de pago (Yape, BCP, PayPal, Nequi, etc.) para los datos de los metodos de pago. Ejm: `/metodos peru-yape`\n\n" +
                "- Comando `/eliminar-venta` para eliminar una venta. Ingresar el numero de venta a borrar.\n\n" +
                "- Comando `/reporte-mensual` para generar el Excel de comisiones. **SOLO ADMINISTRADORES**\n\n" +
                "<a:_alerta_:1316557202621988915> **COMANDOS DISPONIBLE** <a:_alerta_:1316557202621988915>"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
    },

    {
        id: ids.embeds.PANEL_FULL_INFO, // full info
        messageId: '1434932213912441033',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Full Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) - [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)  [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/CEFD84D027D946ADA9C9981C4946D53A4)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuFullInfo
    },

    {
        id: ids.embeds.PANEL_SECURE_INFO, // secure info
        messageId: '1435442825767420037',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Secure Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) - [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) - [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)  [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/CEFD84D027D946ADA9C9981C4946D53A4)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuSecureInfo
    },

    {
        id: ids.embeds.PANEL_ONLY_AIMBOT_INFO, // only aimbot info
        messageId: '1435442826593960099',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel Only Aimbot Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) - [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) - [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)  [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/CEFD84D027D946ADA9C9981C4946D53A4)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuOnlyAimbotInfo
    },

    {
        id: ids.embeds.MENU_CHAMS_INFO,
        messageId: '1435442827663511583',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Menu Chams Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows Defender](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) - [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)  [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/CEFD84D027D946ADA9C9981C4946D53A4)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuChamsInfo
    },

    {
        id: ids.embeds.BYPASS_APK_INFO,
        messageId: '1435442828355309608',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Bypass APK Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) - [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) - [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234)  [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/CEFD84D027D946ADA9C9981C4946D53A4)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuBypassApkInfo
    },

    {
        id: ids.embeds.BYPASS_ID_INFO,
        messageId: '1447043023987933255',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Bypass ID Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Desactivar Windows](https://mega.nz/file/t4pGwaRQ#uDFuTSEL0mw5zSpnYMtj1_0FGbQB8SpcLsOdRrk4vpg) - [Tutorial de instalación](https://youtu.be/kGNnJm8vob4)\n" +
                "<:Regedit:1433924546242674688> [Eliminar Emulador](https://www.asuswebstorage.com/navigate/a/#/s/397E7A3AC777406585B6AC60C02056614) \n" +
                "<:visualcode:1318276426885103719>  [Requerimientos del panel](https://www.asuswebstorage.com/navigate/a/#/s/2BDD28B35E6E49C7BC6613CF8AC551954) - [Tutorial de instalación](https://youtu.be/DimHrgN9Bp0)\n" +
                "<:visualcode:1318276426885103719>  [DLL](https://www.asuswebstorage.com/navigate/a/#/s/D6606A1916944E3F9223EA0FFFC6B5234) - [Tutorial de instalación](https://youtu.be/uLnKbGzELVE)\n\n" +
                "**Emuladores compatibles**\n" +
                "<a:_alerta_:1316557202621988915>  *`- Compatibles con el panel.`*\n\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.14)](https://www.asuswebstorage.com/navigate/a/#/s/36339C6867DC4BE9BE5360E63002ED4F4)\n" +
                "<:bluestacks5:1433923976966570135>  [Emulador BlueStacks P64(v5.22.1001)](https://www.mediafire.com/file/gfyctlqlo8xtsjr/BlueStacks_5.22.exe/file)\n" +
                "<:msi5:1433924381423177799> [Emulador MSI P64(v5.12)](https://www.mediafire.com/file/2gz19xwx14lctlg/Msi_App.5.12.exe/file)\n\n" +
                "**Free Fire Versions**\n" +
                "*`- Compatibles con el panel.`*\n\n" +
                "<:obb51:1433261279979769856> [Free Fire Normal](https://www.mediafire.com/file/bvx0pi6pxjtlpui/Free_Fire_Normal.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire India/Max](https://www.mediafire.com/file/73c2zqnqs3p3qww/Free_Fire_India-Max.xapk/file)\n" +
                "<:obb51:1433261279979769856> [Free Fire Tela](https://www.mediafire.com/file/y3dchqybqstx17d/FreeFire-X86-Tela.xapk/file)\n\n" +
                "**Loader HyperV**\n" +
                "*`- Actualizado 29/10.`*\n\n" +
                "<:LOGOTIPOLETRASHYPERV:1433266402621653062> [Loader HyperV](https://www.asuswebstorage.com/navigate/a/#/s/A49B04091F6C483D8D143F3F02899AB24?type=previewPageCover)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuBypassInfo
    },

    {
        id: ids.embeds.PANEL_IOS_INFO,
        messageId: '1435441785697730694',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Panel iOS Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Panel iOS (Ipa)](https://www.mediafire.com/file/bpnlv60e6x11zgj/PANEL+IOS+NOVIEMBRE.ipa/file)\n" +
                "<:Regedit:1433924546242674688> [Gbox Udid](https://gbox.run/tool/udid)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuPaneliOSInfo
    },

    {
        id: ids.embeds.AIMBOT_BODY_INFO,
        messageId: '1435441786553237586',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Aimbot Body iOS Informacion')
            .setDescription("<:Windowsdefender:1433924527926018058>[Aimbot Body](https://www.asuswebstorage.com/navigate/a/#/s/532F5DA9B78648BFBA568E1644DB9A164)\n" +
                "<:Regedit:1433924546242674688> [iMazing](https://imazing.com/es/download/windows)\n\n" +
                "**Grupo WhatsApp:** [Click aqui](https://chat.whatsapp.com/BqJU8Ph6F7s39JIbH9HpUL)\n" +
                "<a:_alerta_:1316557202621988915> Obligatorio: Luego de mandar solicitud para unirse, enviar su numero por DM a un <@&" + roles.VENDOR + "> para que sean aceptados.")
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/mrygpcyg/PROGRAMAS-REQUERIDOS-1.png'),
        menu: menus.menuPaneliOSInfo
    },
    
    {
        id: ids.embeds.COMISIONES_INFO,
        messageId: '1440130390370029668',
        embed: new EmbedBuilder()
            .setTitle('> HyperV - Comisiones')
            .setDescription(
                "<:HyperVZeus1:1326269368291688479> **Panel Full**\n\n" +
                "Comisión por soporte: S/10\n\n" +
                "Semanal: S/10 | 2.65$\n" +
                "Mensual: S/20 | 5.30$\n" +
                "Trimestral: S/30 | 8$\n" +
                "Anual: S/40 | 10.50$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Panel Basic**\n\n" +
                "Comisión por soporte: S/5\n\n" +
                "Semanal: S/8 | 2.10$\n" +
                "Mensual: S/15 | 4$\n" +
                "Trimestral: S/20 | 5.30$\n" +
                "Anual: S/30 | 8$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Panel Only Aimbot**\n\n" +
                "Comisión por soporte: S/5\n\n" +
                "Semanal: S/5 | 2.10$\n" +
                "Mensual: S/10 | 4$\n" +
                "Trimestral: S/15 | 5.30$\n" +
                "Anual: S/25 | 8$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Bypass APK**\n\n" +
                "Comisión por soporte: S/5\n\n" +
                "Semanal: S/10 | 3$\n" +
                "14 días: S/15 | 4.5$\n" +
                "Mensual: S/20 | 5.9$\n" +
                "60 días: S/30 | 8.9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Bypass ID**\n\n" +
                "Comisión por soporte: S/5\n\n" +
                "Semanal: S/10 | 3$\n" +
                "14 días: S/15 | 4.5$\n" +
                "Mensual: S/20 | 5.9$\n" +
                "60 días: S/30 | 8.9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Menu Chams ESP**\n\n" +
                "Comisión por soporte: S/5\n\n" +
                "Semanal: S/5 | 1.5$\n" +
                "Mensual: S/15 | 4.5$\n" +
                "Trimestral: S/20 | 5.9$\n" +
                "Anual: S/30 | 8.9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Panel iOS**\n\n" +
                "Comisión por soporte: S/10\n\n" +
                "1 día: S/5 | 1.5$\n" +
                "1 semana: S/15 | 4.5$\n" +
                "1 mes: S/30 | 8.9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Aimbot Body iOS**\n\n" +
                "Comisión por soporte: S/15\n\n" +
                "Aimbot Body por temporada: S/20 | 6$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Aimlock**\n\n" +
                "Comisión por soporte: S/15\n\n" +
                "Anual: S/25 | 7.5$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Regedit**\n\n" +
                "Comisión por soporte: S/15\n\n" +
                "Mensual: S/15 | 4$\n" +
                "Anual: S/30 | 8$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Holograma Android**\n\n" +
                "Comisión por soporte: S/10\n\n" +
                "Holograma por temporada: S/15 | 4.5$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Aimbot Color**\n\n" +
                "Comisión por soporte: S/10\n\n" +
                "Semanal: S/10 | 2.96$\n" +
                "Mensual: S/20 | 6$\n" +
                "Trimestral: S/30 | 9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Spoofer**\n\n" +
                "Comisión por soporte: S/15\n\n" +
                "Permanente: S/30 | 9$\n\n" +
                "<:HyperVZeus1:1326269368291688479> **Boost rank**\n\n" +
                "No hay comisiones fijas"
            )
            .setColor(config.embedColor)
            .setFooter(config.embedFooter)
            .setImage('https://i.ibb.co/V0qnfMdW/WALLPAPER-HYPERV-2.gif'),
    },
];