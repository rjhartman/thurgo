import dotenv from "dotenv";
import { Client, Collection, Intents } from "discord.js";
import commands from "./commands";
import type { ThurgoClient, ThurgoCommand } from "./types";
import logger from "./lib/logs";
import { humanReadableIdentifier } from "./lib/user";

dotenv.config();

export const client: ThurgoClient = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.commands = new Collection();

commands.forEach((command: ThurgoCommand | undefined) => {
  if (command) client.commands?.set(command.data.name, command);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands?.get(interaction.commandName);

  if (!command) {
    logger.verbose(`Command not "${interaction.commandName}" not found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    interaction.reply("There was an error while executing this command!");
    logger.error(
      `Failed to run the command "${
        interaction.commandName
      }" by user ${humanReadableIdentifier(interaction.user)}`,
      interaction.user,
      error
    );
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);
