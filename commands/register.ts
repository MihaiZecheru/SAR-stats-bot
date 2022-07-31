import { GuildMember } from "discord.js";
import { Api } from "../api";
import { ApplicationUser, IApplicationUser } from "../ApplicationUser";
import { Colors } from "../colors";
import { icon } from "../icon";

export async function register(dUser: GuildMember, steamProfileLink: string, name?: string): Promise<object> {
  const linkFilter: string = "https://steamcommunity.com/profiles/";
  if (!steamProfileLink.startsWith(linkFilter)) {
    return { embeds: [{
      color: Colors.red,
      title: "Invalid URL",
      description: `The given \`steam-profile-link\` is invalid. The link must look like this: \`https://steamcommunity.com/profiles/76561199280617395\``,
      timestamp: new Date(),
      footer: { text: "Invalid URL", iconURL: icon }
    }]};
  }

  const steamid = steamProfileLink.substring(steamProfileLink.indexOf(linkFilter) + linkFilter.length, (!steamProfileLink.endsWith("/") ? steamProfileLink.length : steamProfileLink.length - 1));
 
  // check if user is already registered
  if ((await Api.getAll()).filter((user: IApplicationUser) => user.steamid === steamid).length) {
    return { embeds: [{
      color: Colors.red,
      title: "Profile Already Registered",
      description: `The following id (\`${steamid}\`) has already been registered with the bot. The aforementioned user is registered as \`${(await Api.getAll()).filter((user: IApplicationUser) => user.steamid === steamid)[0].name}\``,
      timestamp: new Date(),
      footer: { text: "Profile Already Registered", iconURL: icon }
    }]};
  }
  
  const user: IApplicationUser = await Api.postUser(new ApplicationUser({
    id: -1, // won't be used
    name: (name ? name : dUser.displayName),
    steamid: steamid,
    discordid: dUser.user.id
  } as IApplicationUser));

  return { embeds: [{
    color: Colors.green,
    name: "Successfully Registered",
    description: `Your account has been registered with the bot with the name \`${user.name}\`. Type \`/stats\` to view your Super Animal Royale stats!`,
    timestamp: new Date(),
    footer: { text: "Successfully Registered", iconURL: icon }
  }]};
}
