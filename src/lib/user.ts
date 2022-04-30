import { User } from "discord.js";

export const humanReadableIdentifier = (user: User) => {
  return `${user.username}#${user.tag}`;
};
