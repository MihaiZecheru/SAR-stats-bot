import { CommandInteraction } from "discord.js";
import { Api } from "../api";
import { Colors } from "../colors";
import { icon } from "../icon";

export async function changeName(interaction: CommandInteraction, newName: string): Promise<object> {
  await Api.changeName(interaction.user.id, newName);
  
  return { embeds: [{
    color: Colors.green,
    title: "Name Changed",
    description: `Your name has been changed to \`${newName}\``,
    timestamp: new Date(),
    footer: { text: "Name Changed", iconURL: icon }
  }]};
}