import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import type { ThurgoCommand } from "../types";
import { Items } from "oldschooljs";

const command: ThurgoCommand = {
  data: new SlashCommandBuilder()
    .setName("high-alch")
    .setDescription("Gets the best ROI items for high-alching."),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Todo");
  },
};

export default command;
