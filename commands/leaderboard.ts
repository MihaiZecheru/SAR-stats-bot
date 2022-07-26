import { Api } from "../api";
import { IApplicationUser } from "../ApplicationUser";
import { Colors } from "../colors";
import { icon } from "../icon";
import { SARdata } from "../TSARdata";

export async function getUsers() {
  return await Promise.all((await Api.getAll()).map(async (user: IApplicationUser): Promise<SARdata> => {
    const data = new SARdata(await Api.getSARdata(user.steamid), user.name);
    try {
      data.stats.Kills.value;
    } catch (e) {
      data.stats.Kills = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.KillsDuos.value;
    } catch (e) {
      data.stats.KillsDuos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.KillsSquads.value;
    } catch (e) {
      data.stats.KillsSquads = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.Deaths.value;
    } catch (e) {
      data.stats.Deaths = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.DeathsDuos
    } catch (e) {
      data.stats.DeathsDuos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.DeathsSquads.value;
    } catch (e) {
      data.stats.DeathsSquads = { group: "", priority: 0, value: 0 }
    }

    try {
      data.stats.Wins.value;
    } catch (e) {
      data.stats.Wins = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.WinsDuos.value;
    } catch (e) {
      data.stats.WinsDuos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.WinsSquads.value;
    } catch (e) {
      data.stats.WinsSquads = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.Games.value;
    } catch (e) {
      data.stats.Games = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.GamesDuos.value;
    } catch (e) {
      data.stats.GamesDuos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.GamesSquads.value;
    } catch (e) {
      data.stats.GamesSquads = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.Top5.value;
    } catch (e) {
      data.stats.Top5 = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.Top3Duos.value;
    } catch (e) {
      data.stats.Top3Duos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.Top2Squads.value;
    } catch (e) {
      data.stats.Top2Squads = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.MostKills.value;
    } catch (e) {
      data.stats.MostKills = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.MostKillsDuos.value;
    } catch (e) {
      data.stats.MostKillsDuos = { group: "", priority: 0, value: 0 };
    }

    try {
      data.stats.MostKillsSquads.value;
    } catch (e) {
      data.stats.MostKillsSquads = { group: "", priority: 0, value: 0 };
    }

    return data;
  }));
}

export async function leaderboard(gameMode: string): Promise<object> {
  gameMode = gameMode.toLowerCase();
  const users: Array<SARdata> = await getUsers();

  switch (gameMode) {
    case "s":
    case "sls":
    case "sl":
    case "so":
    case "solo":
    case "solos":
      return { embeds: [{
        color: Colors.purple,
        title: "Solo Kills Leaderboard",
        fields: users.sort((a, b) => (a.stats.Kills.value > b.stats.Kills.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
         return {
          name: `#${index + 1} - ${user.username}`,
          value: `Kills: .......................... **${user.stats.Kills.value}**\nDeaths: .................... **${user.stats.Deaths.value}**\nKill/Death Ratio: .. \`${(user.stats.Kills.value / (user.stats.Deaths.value === 0 ? 1 : user.stats.Deaths.value)).toFixed(2)}\`\nTop 5 Placements**:** \`${user.stats.Top5.value}\`\nGames: ................... \`${user.stats.Games.value}\`\nWins: ....................... **${user.stats.Wins.value}**\nLosses: .................... **${user.stats.Games.value - user.stats.Wins.value}**\nWin Percentage: .. \`%${(((user.stats.Wins.value / ((user.stats.Games.value - user.stats.Wins.value) === 0 ? 1 : (user.stats.Games.value - user.stats.Wins.value)))) * 100).toFixed(2)}\``,
          inline: false
        }}),
        timestamp: new Date(),
        footer: { text: "Solo Kills Leaderboard", iconURL: icon }
      }]};

    case "d":
    case "dus":
    case "dos":
    case "ds":
    case "duo":
    case "duos":
      return { embeds: [{
        color: Colors.purple,
        title: "Duos Kills Leaderboard",
        fields: users.sort((a, b) => (a.stats.KillsDuos.value > b.stats.KillsDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
         return {
          name: `#${index + 1} - ${user.username}`,
          value: `Kills: .......................... **${user.stats.KillsDuos.value}**\nDeaths: .................... **${user.stats.DeathsDuos.value}**\nKill/Death Ratio: .. \`${(user.stats.KillsDuos.value / (user.stats.DeathsDuos.value === 0 ? 1 : user.stats.DeathsDuos.value)).toFixed(2)}\`\nTop 3 Placements**:** \`${user.stats.Top3Duos.value}\`\nGames: ................... \`${user.stats.GamesDuos.value}\`\nWins: ....................... **${user.stats.WinsDuos.value}**\nLosses: .................... **${user.stats.GamesDuos.value - user.stats.WinsDuos.value}**\nWin Percentage: .. \`%${((user.stats.WinsDuos.value / ((user.stats.GamesDuos.value - user.stats.WinsDuos.value) === 0 ? 1 : (user.stats.GamesDuos.value - user.stats.WinsDuos.value))) * 100).toFixed(2)}\``,
          inline: false
        }}),
        timestamp: new Date(),
        footer: { text: "Duos Kills Leaderboard", iconURL: icon }
      }]};

    case "sq":
    case "sqd":
    case "sd":
    case "sqds":
    case "squads":
    case "squads":
      return { embeds: [{
        color: Colors.purple,
        title: "Squads Kills Leaderboard",
        fields: users.sort((a, b) => (a.stats.KillsSquads.value > b.stats.KillsSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
         return {
          name: `#${index + 1} - ${user.username}`,
          value: `Kills: .......................... **${user.stats.KillsSquads.value}**\nDeaths: .................... **${user.stats.DeathsSquads.value}**\nKill/Death Ratio: .. \`${(user.stats.KillsSquads.value / (user.stats.DeathsSquads.value === 0 ? 1 : user.stats.DeathsSquads.value)).toFixed(2)}\`\nTop 2 Placements**:** \`${user.stats.Top2Squads.value}\`\nGames: ................... \`${user.stats.GamesSquads.value}\`\nWins: ....................... **${user.stats.WinsSquads.value}**\nLosses: .................... **${user.stats.GamesSquads.value - user.stats.WinsSquads.value}**\nWin Percentage: .. \`%${((user.stats.WinsSquads.value / ((user.stats.GamesSquads.value - user.stats.WinsSquads.value) === 0 ? 1 : (user.stats.GamesSquads.value - user.stats.WinsSquads.value))) * 100).toFixed(2)}\``,
          inline: false
        }}),
        timestamp: new Date(),
        footer: { text: "Squads Kills Leaderboard", iconURL: icon }
      }]};

    default:
      return { embeds: [{
        colors: Colors.red,
        title: "Invalid Game Mode",
        description: "The `game-mode` argument must be either `Solos`, `Duos`, `Squads`, or `All`",
        timestamp: new Date(),
        footer: { text: "Invalid Game Mode", iconURL: icon }
      }]}
  }
}