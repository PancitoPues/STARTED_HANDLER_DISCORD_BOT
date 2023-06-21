const { GUARDAR_DATOS_SERVER } = require("../../utils/funciones.js");
const serverSchema = require(`../../models/servidor`);
const Discord = require("discord.js");
module.exports = async (client, message) => {
    const member = message.author
    if (!message.guild || !message.channel || member.bot) return;
    const data = await serverSchema.findOne({ guildID: message.guild.id });
    await GUARDAR_DATOS_SERVER(message.guild.id)
    if (message.content.startsWith(data.prefijo)) {
        //Variables de bloque
        const args = message.content.slice(data.prefijo.length).trim().split(' ');
        const cmd = args.shift()?.toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
        //Si hay un comando:
        if (command) {
            //Modificamos los permisos del comando
            if (command.permisos_bot) {
                //Si el comando no tiene permisos para el bot:
                if (!message.guild.members.me.permissions.has(command.permisos_bot)) return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`**No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
                        .setColor(client.colors.purpura)
                    ]
                });
            } else if (command.permisos) {
                //Si el comando no tiene permisos para el user:
                if (!message.member.permissions.has(command.permisos)) return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`**No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
                        .setColor(client.colors.purpura)
                    ]
                });
            }
            //Intentamos ejecutar el comando:
            try {
                command.run(client, message, args, data.prefijo);
            } catch (e) {
                //en caso de haber un error:
                return message.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`**Lo siento, hubo un error al ejecutar este prefixCommand, vuelve a intentar más tarde...**\n\n**__ERROR EN LA CONSOLA__**\n\`\`\`${e}\`\`\``)
                        .setColor(client.colors.purpura)
                    ]
                })
            }
        }
    }
}
