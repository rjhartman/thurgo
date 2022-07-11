import type {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import type { Client, Collection, CommandInteraction } from "discord.js";

export type CommandHandler = (interaction: CommandInteraction) => Promise<void>;

export interface ThurgoCommand {
  execute: CommandHandler;
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    | SlashCommandSubcommandsOnlyBuilder;
}

export interface ThurgoClient extends Client {
  commands?: Collection<string, ThurgoCommand>;
}
