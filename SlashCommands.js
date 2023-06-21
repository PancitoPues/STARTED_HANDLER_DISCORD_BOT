const fs = require('node:fs')
const { Routes } = require("discord.js")
const { REST } = require("@discordjs/rest")
const { canaryID, tokenCanary, oficialID, token } = require("../Config/config.json")
require("colors");

try {
    let slash = [];
    console.log("╭───────────────✧".brightGreen)
    fs.readdirSync("./slashCommands/").forEach((carpeta) => {
        const comandos = fs.readdirSync(`./slashCommands/${carpeta}`).filter((archivo) => archivo.endsWith(".js"));
        for (let archivo of comandos) {
            let comando = require(`../slashCommands/${carpeta}/${archivo}`);
            console.log(`│ Slash - ${archivo} se ha cargado correctamente!`.brightGreen)
            if (comando.data.name) {
                slash.push(comando.data.toJSON());
            } else {
                console.log(`│ Slash - ${archivo} ERROR =>>> COMANDO VACIO O NO ESTA CONFIGURADO DEL TODO.`.brightRed)
                continue;
            }
        }
        const rest = new REST({ version: '10' }).setToken(token);
        let porc = 0;

            (async () => {
                await rest.put(
                    Routes.applicationCommands(oficialID),
                    { body: slash },
                    ).then(() => {
                        console.log(`[${porc = porc + 7,14285715}%] Comandos subidos...`)
                    });
                })()
    })
    console.log("╰───────────────✧".brightGreen)
    console.log(`╔═════════════════════════════════════════════════════╗\n║               SlashCommands cargados...             ║\n╚═════════════════════════════════════════════════════╝`.brightGreen)

} catch (e) {
    console.log(e)
}

console.log(`╔═════════════════════════════════════════════════════╗\n║              Listo! Disponible para usar            ║\n╚═════════════════════════════════════════════════════╝`.brightCyan)
