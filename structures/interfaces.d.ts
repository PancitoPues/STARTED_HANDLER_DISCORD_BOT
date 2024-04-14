import { ApplicationCommandOptionData, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
export interface SlashBuilder {
  name: string;
  description: string;
  type: ApplicationCommandType;
  dm_permission?: boolean;
  default_permission?: boolean;
  default_member_permissions?: bigint;
  nfsw?: boolean;
  options?: ApplicationCommandOptionData[];
  // Optionals
  premium?: boolean;
  execute: (client: import("./types").client, interaction: ChatInputCommandInteraction) => Promise<void>;
}