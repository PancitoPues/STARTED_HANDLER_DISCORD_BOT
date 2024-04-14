import Discord from "discord.js";
/**
 * @type {import("../../structures/interfaces").SlashBuilder}
 */
export default {
  name: "help",
  description: "💜 Sirve para ver los comandos del bot.",
  type: Discord.ApplicationCommandType.ChatInput,
  async execute(client, interaction) {
    return interaction.reply({
      embeds: [new Discord.EmbedBuilder().setTitle("HOLA QUE TAL?").setDescription("Este es mi comando de ayuda, aun no esta construido...").setColor(Discord.Colors.LuminousVividPink)],
    });
  },
};
