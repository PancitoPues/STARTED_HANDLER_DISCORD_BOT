const fs = require('node:fs');
const config = require("../Config/config.json")
module.exports = async (client) => {
    try {
        let cantidad = 0;
        let allevents = [];
        const cargar_dir = (dir) => {
            const archivos_eventos = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith('.js'));
            for (const archivo of archivos_eventos) {
                try {
                    const evento = require(`../events/${dir}/${archivo}`);
                    console.log(`(&) Evento - ${archivo} se ha cargado correctamente!`.brightGreen)
                    const nombre_evento = archivo.split(".")[0];
                    allevents.push(nombre_evento);
                    client.on(nombre_evento, evento.bind(null, client));
                    cantidad++
                } catch (e) {
                    console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `     Error: ${e}\n`.brightYellow)
                }
            }
        }
        await ["client", "guild"].forEach(e => cargar_dir(e));
        console.log(`\n┈┈┈┈┈┈┈┈> ${cantidad} EVENTOS CARGADOS CORRECTAMENTE...\n`.brightGreen);
        try { console.log(`┈┈┈┈┈┈┈┈> INICIANDO SESIÓN CON EL TOKEN (${config.tokenCanary.slice(0, 4)}*********************)\n`.brightYellow) } catch (e) { console.log(e) }
    } catch (e) {
        console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `     Error: ${e}\n`.brightYellow)
    }
}
