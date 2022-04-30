import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import deployCommands from "../deploys/commands";
import logger from "../lib/logs";
import { humanReadableIdentifier } from "../lib/user";
import type { ThurgoCommand } from "../types";

const command: ThurgoCommand = {
  data: new SlashCommandBuilder()
    .setName("refresh-commands")
    .setDescription("Re-deploys the slash commands."),
  async execute(interaction: CommandInteraction) {
    const permissions = interaction.member?.permissions;

    logger.verbose(
      `User ${humanReadableIdentifier(interaction.user)} (id: ${
        interaction.user.id
      }) asked to deploy commands.`
    );

    if (
      permissions &&
      typeof permissions !== "string" &&
      permissions.has("ADMINISTRATOR")
    ) {
      try {
        await deployCommands();
        await interaction.reply("Commands deployed!");
        logger.info(`Deployed (${humanReadableIdentifier(interaction.user)})`);
      } catch (error) {
        await interaction.reply(
          "Something went wrong while deploying commands :("
        );
      }
    } else {
      await interaction.reply(
        "You're trying to do something you shouldn't :eyes:"
      );
      logger.debug(
        `${humanReadableIdentifier(
          interaction.user
        )} was not an administrator. Not deploying commands.`
      );
    }
  },
};

export default command;
