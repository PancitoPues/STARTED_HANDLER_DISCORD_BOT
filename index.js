//Definimos las propiedades de Discord
const config = require('./Config/config.json');
const Discord = require("discord.js");
const fs = require("node:fs");
require('colors'); //Requiere color si gustas tener una consola mas personalizada
//Definimos el cliente de todo el codigo:
const client = new Discord.Client({
  allowedMentions: { repliedUser: false }, //Definimos si queremos notifique las menciones que haga el bot (Anti everyone)
  partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction, Discord.Partials.GuildMember, Discord.Partials.User, Discord.Partials.GuildScheduledEvent, Discord.Partials.ThreadMember],
  intents: 3276799
})
//Eventos de comandos - aliases - color por defecto (client.color) y evento ready usado para la presencia del bot (conectado o no conectado)
client.slash = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.colors = config.colors;
//Iniciando los procesos para leer todos los handlers y eventos del bot
console.log("\n┈┈┈┈┈┈┈┈> INICIANDO PROCESOS DE LECTURA DE DATOS <┈┈┈┈┈┈┈┈\n")
//Hace la lectura de los fileLoads
fs.readdirSync("./fileloads").filter(handler => handler.endsWith(".js")).forEach(handler => {
  try { require(`./fileloads/${handler}`)(client, Discord) } catch (e) { console.warn(e) }
})
//Comprobadores de errores sobre el bot o comandos aplicados.
//const ERROR = new Discord.WebhookClient({ url: Inserta aqui el String URL del WebHook > "" });
//Generamos los errores en consola y los enviamos:
process.on('unhandledRejection', (error) => {
  console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `Error: ${error.stack}\n`.brightYellow)
  //ERROR.send(`\`\`\`js\n${error.stack}\`\`\``)
});
//----------------------------------------------------------
process.on('uncaughtException', (err, origin) => {
  //ERROR.send(`\`\`\`js\n${err.stack}\`\`\``)
  console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `Error: ${err.stack}\n`.brightYellow)
});
//----------------------------------------------------------
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(`[X] CRASHEO EVITADO A CAUSA DE UN NUEVO ERROR!\n`.brightRed + `Error: ${err.stack}\n`.brightYellow)
  //ERROR.send(`\`\`\`js\n${err.stack}\`\`\``)
});
//----------------------------------------------------------
process.on('beforeExit', (code) => {
  //ERROR.send(`\`\`\`js\n${code}\`\`\``)
});
//----------------------------------------------------------
process.on('exit', (code) => {
  //ERROR.send(`\`\`\`js\n${code}\`\`\``)
});
//----------------------------------------------------------
//Requerimos el token del bot
client.login(config.token)
//Exportamos client:
module.exports = {
  client
}