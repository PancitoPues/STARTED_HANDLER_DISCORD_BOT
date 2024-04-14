/**
 * @param {typeof import("../../index.js").default} client - Type of client
 * @param {string} guildid - Guild ID
 */
export async function saveServerData(client, guildid) {
  if (guildid) {
    let schema = client.dataBase.Server;
    let serverdata = await schema.findOne({ _id: guildid }).lean();
    if (!serverdata) {
      serverdata = new schema({
        _id: guildid,
      });
      console.log(`Asegurado: Config de Server ${guildid}`);
      await serverdata.save().catch((err) => console.log(err));
    }
    return serverdata;
  }
}
