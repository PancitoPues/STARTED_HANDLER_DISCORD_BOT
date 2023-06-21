const Discord = require("discord.js");
const fs = require('node:fs');
module.exports = (client) => {
  //Hace lectura de los handlers
  fs.readdirSync("./handlers").filter(handler => handler.endsWith(".js")).forEach(handler => {
    try { require(`../handlers/${handler}`)(client, Discord) } catch (e) { console.warn(e) }
  })
  //Hace lectura de los subHandlers
  fs.readdirSync("./handlers").filter((carpeta) => !carpeta.endsWith(".js")).forEach((carpeta) => {
    const Carpeta = fs.readdirSync(`./handlers/${carpeta}`)
    for (const archivo of Carpeta) {
      try { require(`../handlers/${carpeta}/${archivo}`) } catch (e) { console.warn(e) }
    }
  });
}

