import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";
import type { ThurgoCommand } from "../types";

type Subcommand = "new";

const SUBCOMMANDS = {
  new: (interaction: CommandInteraction) => {
    const itemsString = interaction.options.getString("items");
    if (!itemsString) {
      interaction.reply(
        "You have to specify the items to include in the raffle."
      );
      return;
    }

    let items;

    // Parse the items string sent in.
    try {
      items = itemsString
        .split(",")
        .map((item) => {
          const [name, quantityStr] = item.split(":");
          const quantity =
            quantityStr === undefined ? 1 : Number.parseInt(quantityStr);
          if (!Number.isInteger(quantity))
            throw new Error(`Invalid quantity ${quantityStr} for item ${name}`);
          return { name, quantity };
        })
        .filter((item) => !!item.name);
    } catch (e) {
      interaction.reply("Couldn't parse your list of items. " + e);
      return;
    }

    const winners = interaction.options.getInteger("winners") || 1;

    interaction.reply(
      `Sure! Making a raffle for ${winners} winner(s) with item(s): ` +
        items.map((item) => `${item.quantity} ${item.name}`).join(", ")
    );
  },
};

const command: ThurgoCommand = {
  data: new SlashCommandBuilder()
    .setName("raffle")
    .setDescription("Replies with Pong!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("new")
        .setDescription("Create a new raffle")
        .addStringOption((option) =>
          option
            .setName("name")
            .setRequired(true)
            .setDescription("The name of the raffle")
        )
        .addStringOption((option) =>
          option
            .setName("items")
            .setDescription(
              "The items to include in the raffle, delimited by a comma. " +
                "e.g: flour,egg:2\n"
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("winners")
            .setDescription(
              "Number of winners to be drawn from the raffle. Defaults to 1."
            )
            .setMinValue(1)
        )
    ),
  async execute(interaction: CommandInteraction) {
    const subcommand = interaction.options.getSubcommand() as Subcommand;
    console.log(subcommand);
    SUBCOMMANDS[subcommand](interaction);
  },
};

export default command;
