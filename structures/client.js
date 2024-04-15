import { ActivityType, Client, Partials, PresenceUpdateStatus, Collection, ShardingManager, Events, GatewayIntentBits, Colors } from "discord.js";
import pkg from "../package.json" assert { type: "json" };
import mongoose from "mongoose";
import { readdirSync } from "node:fs";
export default class extends Client {
  constructor(
    options = {
      intents: Object.keys(GatewayIntentBits),
      partial: Object.keys(Partials),
      allowedMentions: {
        parse: ["users"],
        repliedUser: false,
      },
      presence: {
        activities: [{ name: "Iniciando...", type: ActivityType.Custom }],
        status: PresenceUpdateStatus.Online,
      },
    }
  ) {
    super({
      ...options,
    });
    this.setMaxListeners(0);
    // Creamos los collectors
    this.package = pkg;
    this.slash = new Collection();
    this.color = Colors;
    // Definimos la base de datos completa:
    (async () => {
      /**
       * @type {import("../types/DataBase").DataBase}
       */
      this.dataBase = {
        Server: (await import(`../models/server.js`)).default,
      };
    })();
    // Iniciamos nuestro client
    this.start();
  }
  async start() {
    console.log("\n┈┈┈┈┈┈┈┈> STARTING READ DATA PROCESS <┈┈┈┈┈┈┈┈\n");
    await this.loadErrors();
    // Cargamos los eventos y los handlers
    await this.loadEvents();
    await this.loadHandlers();
    // Cargamos la base de datos
    // await this.loadDataBase();
    // this.loadShards()
    // Iniciamos sesion en el bot
    this.login(process.env.DEV == "0" ? process.env.TOKEN_PRODUCTION : process.env.TOKEN_DEVELOPER);
  }
  async loadSlashCommands() {
    try {
      const slash = [];
      const files = readdirSync("./slashCommands/");
      for (const file of files) {
        const commands = readdirSync(`./slashCommands/${file}`).filter((archivo) => archivo.endsWith(".js"));
        for (const archivo of commands) {
          const command = (await import(`../slashCommands/${file}/${archivo}`)).default;
          if (command.name) {
            this.slash.set(command.name, command);
            slash.push(command);
          } else {
            console.log(`(X) Slash - ${archivo} ERROR => EMPTY FILE.`);
          }
        }
      }
      await this.application.commands.set(slash);
      console.log(slash);
    } catch (e) {
      console.log(`[X] NEW ERROR!\n` + `${e.stack}\n`);
    } finally {
      console.log(`┈┈┈┈┈┈┈┈> ${(await this.application.commands.fetch()).size} SLASHCOMMANDS LOADED SUCCESSFULLY...\n`);
    }
  }

  async loadEvents() {
    try {
      let amount = 0;
      const events = readdirSync(`./events`);
      for (const dir of events) {
        const EVENT_FILES = readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of EVENT_FILES) {
          try {
            let event = await import(`../events/${dir}/${file}`);
            const EVENT_NAME = file.split(".")[0];
            this.on(`${Events[EVENT_NAME]}`, event?.default?.bind(null, this));
            amount++;
          } catch (e) {
            console.log(`[X] NEW ERROR!\n`.brightRed + `${e}\n`.brightYellow);
          }
        }
      }
      console.log(`┈┈┈┈┈┈┈┈> ${amount} EVENTS LOADED SUCCESSFULLY...\n`.brightGreen);
    } catch (e) {
      console.log(`[X] NEW ERROR!\n`.brightRed + `${e}\n`.brightYellow);
    }
  }
  async loadHandlers() {
    let handlers = 0;
    //Hace lectura de los handlers
    readdirSync("./handlers")
      .filter((handler) => handler.endsWith(".js"))
      .forEach(async (handler) => {
        handlers += 1;
        try {
          const module = await import(`../handlers/${handler}`);
          module.default(this);
        } catch (e) {}
      });
    //Hace lectura de los subHandlers
    readdirSync("./handlers")
      .filter((folder) => !folder.endsWith(".js"))
      .forEach(async (folder) => {
        const FOLDER_IN_FOLDER = readdirSync(`./handlers/${folder}`);
        for (const file of FOLDER_IN_FOLDER) {
          handlers += 1;
          try {
            await import(`../handlers/${folder}/${file}`);
          } catch (e) {
            console.error(e);
          }
        }
      });
    console.log(`┈┈┈┈┈┈┈┈> ${handlers} HANDLERS LOADED SUCCESSFULLY...\n`.brightMagenta);
    console.log(`┈┈┈┈┈┈┈┈> LOGGING IN...\n`.brightYellow);
  }
  async loadDataBase() {
    //Ejecutamos la base de datos:
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // 30 segundos
        connectTimeoutMS: 30000, // 30 segundos
        socketTimeoutMS: 360000, // 6 minutos
      })
      .then(async (res) => {
        console.log(`┈┈┈┈┈┈┈┈> CONNECTED TO THE DATABASE - ${this.user?.username}\n`.brightBlue);
      })
      .catch((e) => {
        //Si tenemos un error:
        console.log(`[X] NEW ERROR MONGODB\n`.brightRed + `${e}\n`.brightYellow);
      });
  }
  async loadErrors() {
    //Hace lectura de los handlers
    const module = await import(`./errors/execution.js`);
    module.default();
  }
  loadShards() {
    const manageShards = new ShardingManager("index.js", { totalShards: 1, token: "" });
    manageShards.on("shardCreate", (shard) => console.log(`Lanzado shard ${shard.id}`));
    manageShards.spawn();
  }
}
