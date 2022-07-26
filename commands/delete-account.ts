import { User } from "discord.js";
import { Api } from "../api";
import { Colors } from "../colors";
import { icon } from "../icon";

export async function deleteAccount(user: User): Promise<object> {
  // check if user is registered
  if (!(await Api.getUserByDiscordId(user.id))) {
    return { embeds: [{
      color: Colors.red,
      title: "Account Could Not Be Deleted",
      description: "Your account could not be deleted as you do not have an account to delete. To make an account, use `/register`.",
      timestamp: new Date(),
      footer: { text: "Account Could Not Be Deleted", iconURL: icon }
    }]};
  }

  await Api.deleteUser(await Api.getUserByDiscordId(user.id));

  return { embeds: [{
    color: Colors.green,
    title: "Account Deleted",
    description: "Your account has been deleted and your registration has been undone.",
    timestamp: new Date(),
    footer: { text: "Account Deleted", iconURL: icon }
  }]};
}