//Extraemos funciones
const Discord = require("discord.js");
module.exports = async (client, interaction) => {
    //Verificacion de si la interaccion con el bot es un comando, de ser asi retornamos lo siguiente:
    if (interaction.isChatInputCommand()) {
        //Verificamos que la interaccion sea desde un SlashCommand
        const command = client.slash.get(interaction.commandName);
        try {
            await command.run(client, interaction);
        } catch (e) {
            console.log(e)
            interaction.followUp({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`**Lo siento, hubo un error al ejecutar este SlashCommands, vuelve a intentar más tarde...**\n\n**__ERROR EN LA CONSOLA__**\n\`\`\`${e}\`\`\``)
                    .setColor(client.colors.purpura)
                ]
            })
        };
    } else if (!interaction.isStringSelectMenu()) {
        //Verificamos que la interaccion sea un menu:
        return
    }
}