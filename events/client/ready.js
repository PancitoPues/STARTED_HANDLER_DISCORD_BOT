//Requerimos librerias:
const config = require('../../Config/config.json');
const package = require("../../package.json")
const mongoose = require("mongoose");
//Realizamos el module exports:
module.exports = async (client) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        //Si nos conectamos:
        console.log(`┈┈┈┈┈┈┈┈> [~~] CONECTADO A LA BASE DE DATOS Y LISTO PARA USAR! - ${client.user.username}\n`.brightBlue);
    }).catch((e) => {
        //Si tenemos un error:
        console.log(`[X] ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB\n`.brightRed + `     Error: ${e}\n`.brightYellow)
    })
    //Estado del bot preparado y listo para enseñar:
    let estados = ['/help | para comandos!', `En ${client.guilds.cache.size} servidores`, `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Usuarios`, `Versión ${package.version}`]
    let estadosdefinit = estados[Math.floor(Math.random() * estados.length)]
    //Aplicamos el intervalo de 5min para el cambio de estado:
    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: estadosdefinit,
                type: 0,
            }],
            status: "dnd"
        })
    }, 5000);
}