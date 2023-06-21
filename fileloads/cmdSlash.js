const fs = require('node:fs')
module.exports = (client) => {
    try {
        let slash = [];
        let e;
        fs.readdirSync("./slashCommands/").forEach((carpeta) => {
            const commands = fs.readdirSync(`./slashCommands/${carpeta}`).filter((archivo) => archivo.endsWith(".js"));
            for (let archivo of commands) {
                let command = require(`../slashCommands/${carpeta}/${archivo}`);
                console.log(`(/) Slash - ${archivo} se ha cargado correctamente!`.brightYellow)
                if (command.data.name) {
                    client.slash.set(command.data.name, command)
                    slash.push(command.data.toJSON());
                } else {
                    console.log(`(X) Slash - ${archivo} ERROR => COMANDO VACIO O NO ESTA CONFIGURADO DEL TODO.`.brightRed);
                    e = true
                    continue;
                }
            }
        })
        console.log(`\n┈┈┈┈┈┈┈┈> ${client.slash.size} ${e ? "SLASHCOMMANDS CARGADOS CON PEQUEÑOS ERRORES...": "SLASHCOMMANDS CARGADOS CORRECTAMENTE..."}\n`.brightYellow)
    
    } catch (e) {
        console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `     Error: ${e}\n`.brightYellow)
    }
}
