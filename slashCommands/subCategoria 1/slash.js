const { SlashCommandBuilder } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("slashpreview1")
    .setDescription("...")
    .addStringOption((option) =>
      option
        .setName('enter-string')
        .setDescription('...')
        .setRequired(true)),
  async run(client, interaction) {
    //Inserta tu codigo aqui...
  }
}