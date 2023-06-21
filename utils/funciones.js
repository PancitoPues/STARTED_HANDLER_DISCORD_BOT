const serverSchema = require(`../models/servidor.js`);
const config = require(`../Config/config.json`);
async function GUARDAR_DATOS_SERVER(guildid) {
    if (guildid) {
        let serverdata = await serverSchema.findOne({ guildID: guildid })
        if (!serverdata) {
            console.log(`Asegurado: Config de Server`.Green);
            serverdata = new serverSchema({
                guildID: guildid,
                prefijo: config.prefix
            });
            await serverdata.save();
        }
    }
};
//Exportamos los modulos
module.exports = { GUARDAR_DATOS_SERVER }