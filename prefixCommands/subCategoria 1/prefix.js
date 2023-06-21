const schema = require(`../../models/servidor.js`)
const Discord = require("discord.js");
module.exports = {
    name: "prefix",
    aliases: ["prefix", "setprefix"],
    permisos: ["ManageGuild"],
    run: async (client, message, args, prefix) => {
        if (!args[0]) {
            return message.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`**Pero... Debes definir un nuevo prefijo para el bot!**`)
                    .setColor(client.colors.purpura)
                ]
            })
        } else if (args.length >= 3) {
            return message.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`**Tu prefix debe tener una longitud menor a 3 caracteres...**`)
                    .setColor(client.colors.purpura)
                ]
            })
        } else {
            await schema.findOneAndUpdate({ guildID: message.guild.id }, {
                prefijo: args[0]
            })
            return message.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`**ESTA HECHO!, ahora mi prefix paso de ser \`${prefix}\` a \`${args[0]}\`**`)
                    .setColor(client.colors.celeste)
                ]
            })
        }
    }
}