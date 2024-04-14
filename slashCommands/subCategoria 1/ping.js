import Discord from "discord.js";
/**
 * @type {import("../../structures/interfaces").SlashBuilder}
 */
export default {
  name: "ping",
  description: "💜 Sirve para ver la latencia del bot.",
  type: Discord.ApplicationCommandType.ChatInput,
  execute: async (client, interaction) => {
    // Calcular el ping del bot
    const ms = Math.round(client.ws.ping);
    let msAPI = ms + "ms";
    if (ms < 1) {
      msAPI = "buscando...";
    }
    // Calcular el ping del mensaje
    const msMessages = Math.abs(Date.now() - interaction.createdTimestamp);
    // Function to get emoji based on ping
    const getEmoji = (ping) => {
      if (ping < 120 && ping >= 0) return "🟢";
      if (ping < 350 && ping >= 0) return "🟡";
      if (ping >= 350) return "🔴";
      return "🔵";
    };
    return interaction.reply({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor(Discord.Colors.White)
          .setTitle("🏓 PONG")
          .setDescription(
            `\`📩\` **Mensajes**: \`${msMessages}ms ${getEmoji(msMessages)}\`\n\`🔩\` **API**: \`${msAPI} ${getEmoji(ms)}\`\n\`🎫\` **Shard**: \`(${client?.shard ?? 0}) ${
              client?.shard?.ping ?? 0
            }ms 🔘\`\n\`🔰\` **Ayuda en**: \`/help\``
          )
          .setFooter({ text: `${client.user.username} | ${client.package.version}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }),
      ],
    });
  },
};
