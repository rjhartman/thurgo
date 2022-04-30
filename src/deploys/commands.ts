const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import logger from "../lib/logs";
import dotenv from "dotenv";
import commands from "../commands";

dotenv.config();

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

const deploy = async () => {
  logger.info(`Registering ${commands.length} slash commands with server.`);
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APPLICATION_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands.map(({ data }) => data.toJSON()) }
    );
    logger.info("Succesfully created slash commands.");
  } catch (error) {
    logger.error("Could not deploy slash commands.", error);
  }
};

if (require.main === module) deploy();

export default deploy;
