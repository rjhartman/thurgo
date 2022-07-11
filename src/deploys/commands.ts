const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import logger from "../lib/logs";
import dotenv from "dotenv";
import commands from "../commands";

dotenv.config();

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

const deploy = async (guildID: string) => {
  logger.info(`Registering ${commands.length} slash commands with server.`);
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APPLICATION_ID,
        guildID
      ),
      { body: commands.map(({ data }) => data.toJSON()) }
    );
    logger.info("Succesfully created slash commands.");
  } catch (error) {
    logger.error("Could not deploy slash commands.", error);
  }
};

if (require.main === module) {
  const guildId = process.argv.at(2);
  if (guildId) {
    deploy(guildId);
  } else {
    logger.error("You must specify a guildId.");
    process.exit(1);
  }
}

export default deploy;
