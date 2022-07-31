import DiscordJs, { Intents, User, Guild, GuildMember } from "discord.js";
const fs = require('fs');
import dotenv from "dotenv";
import { changeName } from "./commands/change-name";
import { compareStat } from "./commands/compare-stat";
import { leaderboard } from "./commands/leaderboard";
import { ping } from "./commands/ping";
import { register } from "./commands/register";
import { statsList } from "./commands/stats-list";
import { stats } from "./commands/stats";
import { deleteAccount } from "./commands/delete-account";
import { Colors } from "./colors";
import { icon } from "./icon";

const types = DiscordJs.Constants.ApplicationCommandOptionTypes;
dotenv.config();

export let guild: Guild;
export let teacher: User;

// create the bot client
export const client = new DiscordJs.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  console.log("\n---------------- BOT READY ----------------\n");
  guild = client.guilds.cache.get(process.env.GUILD_ID as string)!;

  let commands;

  /* there are two types of slash commands
    - guild
    - global
  */

  if (guild) commands = guild.commands;
  else commands = client.application?.commands;
  
  // guild.commands.set([]); // uncomment to reset all guild slash commands
  
  commands?.create({
    name: "ping",
    description: "get the bot's latency",
  });

  commands?.create({
    name: "stats",
    description: "show a player's stats",
    options: [{
        name: "player",
        description: "the player to show stats for. default: you",
        required: false,
        type: types.USER
    }]
  });
  
  commands?.create({
    name: "compare-stat",
    description: "mini-leaderboard for a single stat",
    options: [{
      name: "stat",
      description: "the stat you want to compare",
      required: true,
      type: types.STRING
    }]
  });

  commands?.create({
    name: "change-name",
    description: "change your name in the database",
    options: [{
      name: "new-name",
      description: "the name to replace your old name with in the database",
      required: true,
      type: types.STRING
    }]
  });

  commands?.create({
    name: "leaderboard",
    description: "show the kills leaderboard for the people registered with the bot",
    options: [{
      name: "game-mode",
      description: "Solos | Duos | Squads | All",
      required: false,
      type: types.STRING
    }]
  });

  commands?.create({
    name: "stats-list",
    description: "shows all possible comparable statistics",
  });

  commands?.create({
    name: "register",
    description: "register yourself with the bot to give it access to your stats",
    options: [
    {
      name: "steam-profile-link",
      description: "the link to your steam profile (ex. https://steamcommunity.com/profiles/76561199280617395)",
      required: true,
      type: types.STRING
    },
    {
      name: "name",
      description: "your name/nickname. you can change this later",
      required: false,
      type: types.STRING
    }]
  });

  commands?.create({
    name: "delete-account",
    description: "delete your account / revoke registration",
  });

  // commands?.create({
  //   name: "",
  //   description: "",
  //   options: []
  // });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction; // get command and args
  const commands = fs.readdirSync("./commands/").filter((file: string) => file.endsWith(".ts")).map((file: string) => file.slice(0, -3));

  if (!commands.includes(commandName)) return;
  interaction.deferReply();

  // @ts-ignore
  await new Promise(r => setTimeout(() => r(), 500))
  fs.appendFileSync("bot.logs", `${new Date().toLocaleString()} - ${interaction?.member?.user.username}#${interaction?.member?.user.discriminator} used /${commandName}\n`);

  switch (commandName) {
    case "ping":
      await interaction.editReply(ping());
      break;

    case "stats":
      await interaction.editReply(await stats(interaction, options.getUser("player") ? options.getUser("player")?.id! : interaction.user.id));
      break;

    case "compare-stat":
      await interaction.editReply(await compareStat(options.getString("stat")?.toLowerCase()!));
      break;

    case "leaderboard":
      if (options.getString('game-mode'))
        await interaction.editReply(await leaderboard(options.getString("game-mode")!));
      else
        await interaction.editReply(await leaderboard("all"));
      break;

    case "stats-list":
      await interaction.editReply(await statsList());
      break;

    case "change-name":
      await interaction.editReply(await changeName(interaction, options.getString("new-name")!));
      break;

    case "register":
      if (options.getString("name"))
        await interaction.editReply(await register(interaction.member as GuildMember, options.getString("steam-profile-link")!, options.getString("name")!));
      else
        await interaction.editReply(await register(interaction.member as GuildMember, options.getString("steam-profile-link")!));
      break;

    case "delete-account":
      await interaction.editReply(await deleteAccount(interaction.user));
      break;

    default:
      await interaction.editReply({ embeds: [{
        color: Colors.red,
        title: "Invalid Command",
        description: `The command you used (\`${commandName}\`) does not exist`,
        timestamp: new Date(),
        footer: { text: "Invalid Command", iconURL: icon }
      }]});
      break;
  }
});

client.login(process.env.TOKEN);
