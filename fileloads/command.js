const fs = require('node:fs');
const config = require('../Config/config.json');
module.exports = (client) => {
    try {
        //prefixCommands
        let comandos = 0;
        let e;
        fs.readdirSync("./prefixCommands/").forEach((carpeta) => {
            const commands = fs.readdirSync(`./prefixCommands/${carpeta}`).filter((archivo) => archivo.endsWith(".js"));
            for (let archivo of commands) {
                let comando = require(`../prefixCommands/${carpeta}/${archivo}`);
                console.log(`(${config.prefix}) Comando - ${archivo} se ha cargado correctamente!`.brightBlue)
                if (comando.name) {
                    client.commands.set(comando.name, comando);
                    comandos++
                } else {
                    console.log(`(X) Comando - ${archivo} ERROR => COMANDO VACIO O NO ESTA CONFIGURADO DEL TODO.`.brightRed);
                    e = true
                    continue;
                }
                if (comando.aliases && Array.isArray(comando.aliases)) comando.aliases.forEach((alias) => client.aliases.set(alias, comando.name));
            }
        });
        console.log(`\n┈┈┈┈┈┈┈┈> ${comandos} ${e ? "PREFIXCOMMANDS CARGADOS CON PEQUEÑOS ERRORES..." : "PREFIXCOMMANDS CARGADOS CORRECTAMENTE..."}\n`.brightBlue)
    } catch (e) {
    }
}

