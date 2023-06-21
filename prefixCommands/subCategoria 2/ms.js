const Discord = require('discord.js');
module.exports = {
    name: "ping",
    aliases: ["ms", "ping"],
    desc: "Sirve para ver el tiempo de espera del bot.",
    run: async (client, message, args, prefix) => {
        message.reply({
            embeds: [new Discord.EmbedBuilder()
                .setColor("Yellow")
                .setTitle('MI PING!')
                .setDescription(`**Ping**: \`${client.ws.ping}ms\`\n **Bot encendido**: \`${client.uptime}\`\n**Ayuda en**: \`${prefix}help\``)
            ]
        });
    }
};
