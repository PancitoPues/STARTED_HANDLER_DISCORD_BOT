//Requerimos librerias:
import Discord from "discord.js";
//Realizamos el module exports:
/**
 * @param {typeof import("../../index").default} client
 */
export default async (client) => {
  await client.loadSlashCommands();
  //Estado del bot preparado y listo para enseñar:
  function getRandomStatusName() {
    let estados = [
      "© COPYRIGHT 2024 - PancitPues",
      "/help | para comandos!",
      `en ${client.guilds.cache.size} servidores`,
      `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Usuarios`,
      `${client.package.version}`,
    ];
    return estados[Math.floor(Math.random() * estados.length)];
  }
  //Aplicamos el intervalo de 5min para el cambio de estado:
  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: getRandomStatusName(),
          type: Discord.ActivityType.Watching,
        },
      ],
      status: Discord.PresenceUpdateStatus.Idle,
    });
  }, 5000);
  console.log(`┈┈┈┈┈┈┈┈> [^_^] CLIENT READY...\n`.brightGreen);
};
