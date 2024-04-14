import Discord from "discord.js";
export default () => {
  const errors = new ProcessErrors(process?.env?.WEBHOOK_ERRORS || undefined, true);
  errors.uncaughtExceptionMonitor();
  errors.unhandledRejection();
  errors.uncaughtException();
  errors.exit();
};
class ProcessErrors {
  constructor(webhookURL, activateAllConsole = false) {
    // this.webhookClient = new Discord.WebhookClient({ url: webhookURL });
    this.activateAllConsole = activateAllConsole;
  }
  unhandledRejection(activateConsole = false) {
    process.on("unhandledRejection", (reason) => {
      if (activateConsole || this.activateAllConsole) {
        console.error(`Unhandled Rejection at: reason: ${reason.stack}`.brightYellow);
      }
      /*this.webhookClient.send(`\`\`\`js\n${reason.stack}\`\`\``).catch(() => {
        console.warn("[x] NO EXISTE UN WEBHOOK PARA ENVIAR.");
      });*/
    });
  }
  uncaughtException(activateConsole = false) {
    process.on("uncaughtException", (err) => {
      if (activateConsole || this.activateAllConsole) {
        console.error(`Caught exception: ${err.stack}`.brightYellow);
        /*this.webhookClient.send(`\`\`\`js\n${err.stack}\`\`\``).catch(() => {
          console.warn("[x] NO EXISTE UN WEBHOOK PARA ENVIAR.");
        });*/
      }
    });
  }
  uncaughtExceptionMonitor(activateConsole = false) {
    process.on("uncaughtExceptionMonitor", (err) => {
      if (activateConsole || this.activateAllConsole) {
        console.error(`Caught exception Monitor: ${err.stack}`.brightYellow);
        /*this.webhookClient.send(`\`\`\`js\n${err.stack}\`\`\``).catch(() => {
          console.warn("[x] NO EXISTE UN WEBHOOK PARA ENVIAR.");
        });*/
      }
    });
  }
  exit(activateConsole = false) {
    process.on("exit", (code) => {
      if (activateConsole || this.activateAllConsole) {
        console.log(`About to exit with code: ${code}`);
        /*this.webhookClient.send(`\`\`\`js\n${code}\`\`\``).catch(() => {
          console.warn("[x] NO EXISTE UN WEBHOOK PARA ENVIAR.");
        });*/
      }
    });
  }
}
