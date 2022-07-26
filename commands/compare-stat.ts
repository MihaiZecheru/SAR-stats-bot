import { Colors } from "../colors";
import { icon } from "../icon";
import { TField } from "./stats";
import { SARdata } from "../TSARdata";
import { getUsers } from "./leaderboard";

function makeEmbed(title: string, fields: Array<TField>): object {
  return { embeds: [{
    color: Colors.pink,
    title: `Leaderboard: ${title}`,
    fields: fields,
    timestamp: new Date(),
    footer: { text: title, iconURL: icon }
  }]};
}

export async function compareStat(stat: string): Promise<object> {
  const users: Array<SARdata> = await getUsers();
  let title: string;

  switch (stat) {
    case "solo":
    case "duo":
    case "squad":
    case "solos":
    case "duos":
    case "squads":
      return { embeds: [{
        color: Colors.red,
        title: "Invalid Stat",
        description: `Use \`/leaderboard ${stat}\` to get a leaderboard comparing this stat`,
        timesamp: new Date(),
        footer: { text: "Invalid Stat", iconURL: icon }
      }]};

    case "games":
    case "game":
    case "all games":
    case "all gamemode games":
    case "all game":
    case "all gamemode game":
    case "all gamemodes game":
    case "all gamemodes games":
    case "played games":
    case "played game":
    case "all played games":
    case "all gamemode played games":
    case "all played game":
    case "all gamemode played game":
    case "all gamemodes played game":
    case "all gamemodes played games":
      title = "All Gamemodes Played Games";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Games.value + a.stats.GamesDuos.value + a.stats.GamesSquads.value) > (b.stats.Games.value + b.stats.GamesDuos.value + b.stats.GamesSquads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Games.value + user.stats.GamesDuos.value + user.stats.GamesSquads.value}**`,
          inline: false
        }
      }));

    case "solos games":
    case "solo games":
    case "solo game":
    case "solos game":
    case "game solos":
    case "games solos":
    case "game solo":
    case "games solo":
      title = "Solos Played Games";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Games.value > b.stats.Games.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Games.value}**`,
          inline: false
        }
      }));

    case "duos games":
    case "duo games":
    case "duo game":
    case "duos game":
    case "game duos":
    case "game duo":
    case "games duos":
    case "games duo":
      title = "Duos Played Games";
      return makeEmbed(title, users.sort((a, b) => (a.stats.GamesDuos.value > b.stats.GamesDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.GamesDuos.value}**`,
          inline: false
        }
      }));

    case "squad games":
    case "squads games":
    case "squad game":
    case "squads game":
    case "games squads":
    case "games squad":
    case "game squad":
    case "game squads":
      title = "Squads Played Games";
      return makeEmbed(title, users.sort((a, b) => (a.stats.GamesSquads.value > b.stats.GamesSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.GamesSquads.value}**`,
          inline: false
        }
      }));

    case "solo kill":
    case "solos kill":
    case "kill solo":
    case "kill solos":
    case "solo kills":
    case "solos kills":
    case "kills solo":
    case "kills solos":
      title = "Solos Kills";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Kills.value > b.stats.Kills.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Kills.value}**`,
          inline: false
        }
      }));
      
    case "duo kill":
    case "duos kill":
    case "kill duos":
    case "kill duo":
    case "duo kills":
    case "duos kills":
    case "kills duos":
    case "kills duo":
      title = "Duos Kills";
      return makeEmbed(title, users.sort((a, b) => (a.stats.KillsDuos.value > b.stats.KillsDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.KillsDuos.value}**`,
          inline: false
        }
      }));
    
    case "squad kill":
    case "squads kill":
    case "kill squad":
    case "kill squads":
    case "squad kills":
    case "squads kills":
    case "kills squads":
    case "kills squad":
      title = "Squads Kills";
      return makeEmbed(title, users.sort((a, b) => (a.stats.KillsSquads.value > b.stats.KillsSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.KillsSquads.value}**`,
          inline: false
        }
      }));

    case "death solo":
    case "death solos":
    case "solo death":
    case "solos death":
    case "solo deaths":
    case "solos deaths":
    case "deaths solo":
    case "deaths solos":
      title = "Solos Deaths";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Deaths.value > b.stats.Deaths.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Deaths.value}**`,
          inline: false
        }
      }));
      
    case "duo death":
    case "duos death":
    case "death duo":
    case "death duos":
    case "duo deaths":
    case "duos deaths":
    case "deaths duos":
    case "deaths duo":
      title = "Duos Deaths";
      return makeEmbed(title, users.sort((a, b) => (a.stats.DeathsDuos.value > b.stats.DeathsDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.DeathsDuos.value}**`,
          inline: false
        }
      }));
      
    case "squad death":
    case "squads death":
    case "death squad":
    case "death squads":
    case "squad deaths":
    case "squads deaths":
    case "deaths squads":
    case "deaths squad":
      title = "Squads Deaths";
      return makeEmbed(title, users.sort((a, b) => (a.stats.DeathsSquads.value > b.stats.DeathsSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.DeathsSquads.value}**`,
          inline: false
        }
      }));

    case "solo win":
    case "solos win":
    case "win solo":
    case "wins solo":
    case "solo wins":
    case "solos wins":
    case "wins solo":
    case "wins solos":
      title = "Solos Wins";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Wins.value > b.stats.Wins.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Wins.value}**`,
          inline: false
        }
      }));
      
    case "duo win":
    case "duos win":
    case "win duo":
    case "win duos":
    case "duo wins":
    case "duos wins":
    case "wins duos":
    case "wins duo":
      title = "Duos Wins";
      return makeEmbed(title, users.sort((a, b) => (a.stats.WinsDuos.value > b.stats.WinsDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.WinsDuos.value}**`,
          inline: false
        }
      }));
      
    case "squad win":
    case "squads win":
    case "win squad":
    case "win squads":
    case "squad wins":
    case "squads wins":
    case "wins squads":
    case "wins squad":
      title = "Squads Wins";
      return makeEmbed(title, users.sort((a, b) => (a.stats.WinsSquads.value > b.stats.WinsSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.WinsSquads.value}**`,
          inline: false
        }
      }));

    case "solo loss":
    case "solos loss":
    case "loss solo":
    case "loss solos":
    case "solo losses":
    case "solos losses":
    case "losses solo":
    case "losses solos":
      title = "Solos Losses";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Games.value - a.stats.Wins.value) > (b.stats.Games.value - b.stats.Wins.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Deaths.value - user.stats.Wins.value}**`,
          inline: false
        }
      }));
      
    case "duo loss":
    case "duos loss":
    case "loss duo":
    case "loss duos":
    case "duo losses":
    case "duos losses":
    case "losses duos":
    case "losses duo":
      title = "Duos Losses";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.GamesDuos.value - a.stats.WinsDuos.value) > (b.stats.GamesDuos.value - b.stats.WinsDuos.value) ? 1: -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.DeathsDuos.value}**`,
          inline: false
        }
      }));
      
    case "squad loss":
    case "squads loss":
    case "loss squad":
    case "loss squads":
    case "squad losses":
    case "squads losses":
    case "losses squads":
    case "losses squad":
      title = "Squads Losses";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.GamesSquads.value - a.stats.WinsSquads.value) > (b.stats.GamesSquads.value - b.stats.WinsSquads.value) ? 1: -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.GamesSquads.value - user.stats.WinsSquads.value}**`,
          inline: false
        }
      }));

    case "solo k/d":
    case "solos k/d":
    case "k/d solo":
    case "k/d solos":
    case "solo kd":
    case "solos kd":
    case "kd solo":
    case "kd solos":
      title = "Solos K/D";
      return makeEmbed(title, users.sort((a, b) => (parseFloat((a.stats.Kills.value / (a.stats.Deaths.value === 0 ? 1 : a.stats.Deaths.value)).toFixed(2)) > parseFloat((b.stats.Kills.value / (b.stats.Deaths.value === 0 ? 1 : b.stats.Deaths.value)).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${(user.stats.Kills.value / (user.stats.Deaths.value === 0 ? 1 : user.stats.Deaths.value)).toFixed(2)}**`,
          inline: false
        }
      }));
      
    case "duo k/d":
    case "duos k/d":
    case "k/d duo":
    case "k/d duos":
    case "duo kd":
    case "duos kd":
    case "kd duos":
    case "kd duo":
      title = "Duos K/D";
      return makeEmbed(title, users.sort((a, b) => (parseFloat((a.stats.KillsDuos.value / (a.stats.DeathsDuos.value === 0 ? 1 : a.stats.DeathsDuos.value)).toFixed(2)) > parseFloat((b.stats.KillsDuos.value / (b.stats.DeathsDuos.value === 0 ? 1 : b.stats.DeathsDuos.value)).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${(user.stats.KillsDuos.value / (user.stats.DeathsDuos.value === 0 ? 1 : user.stats.DeathsDuos.value)).toFixed(2)}**`,
          inline: false
        }
      }));

    case "squad k/d":
    case "squads k/d":
    case "k/d squads":
    case "k/d squad":
    case "squad kd":
    case "squads kd":
    case "kd squads":
    case "kd squad":
      title = "Squads K/D";
      return makeEmbed(title, users.sort((a, b) => (parseFloat((a.stats.KillsSquads.value / (a.stats.DeathsSquads.value === 0 ? 1 : a.stats.DeathsSquads.value)).toFixed(2)) > parseFloat((b.stats.KillsSquads.value / (b.stats.DeathsSquads.value === 0 ? 1 : b.stats.DeathsSquads.value)).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${(user.stats.KillsSquads.value / (user.stats.KillsSquads.value === 0 ? 1 : user.stats.DeathsSquads.value)).toFixed(2)}**`,
          inline: false
        }
      }));

    case "solo win percent":
    case "solos win percent":
    case "win percent solo":
    case "win percent solos":
    case "solo wins percent":
    case "solos wins percent":
    case "wins percent solo":
    case "wins percent solos":
    case "solo win percentage":
    case "solos win percentage":
    case "win percentage solo":
    case "win percentage solos":
    case "solo wins percentage":
    case "solos wins percentage":
    case "wins percentage solo":
    case "wins percentage solos":
    case "solos win ratio":
    case "solo win ratio":
    case "solos wins ratio":
    case "solo wins ratio":
    case "solo win %":
    case "solos win %":
    case "win % solo":
    case "win % solos":
    case "solo wins %":
    case "solos wins %":
    case "wins % solo":
    case "wins % solos":
      title = "Solos Win Percentage";
      return makeEmbed(title, users.sort((a, b) => ((((a.stats.Wins.value / ((a.stats.Games.value - a.stats.Wins.value) === 0 ? 1 : (a.stats.Games.value - a.stats.Wins.value)))) * 100).toFixed(2) > ((((b.stats.Wins.value / ((b.stats.Games.value - b.stats.Wins.value) === 0 ? 1 : (b.stats.Games.value - b.stats.Wins.value)))) * 100).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **%${(((user.stats.Wins.value / ((user.stats.Games.value - user.stats.Wins.value) === 0 ? 1 : (user.stats.Games.value - user.stats.Wins.value)))) * 100).toFixed(2)}**`,
          inline: false
        }
      }));
    
    case "duo win percent":
    case "duos win percent":
    case "win percent duo":
    case "win percent duos":
    case "duo wins percent":
    case "duos wins percent":
    case "wins percent duo":
    case "wins percent duos":
    case "duo win percentage":
    case "duos win percentage":
    case "win percentage duo":
    case "win percentage duos":
    case "duo wins percentage":
    case "duos wins percentage":
    case "wins percentage duo":
    case "wins percentage duos":
    case "duo win %":
    case "duos win %":
    case "win % duo":
    case "win % duos":
    case "duo wins %":
    case "duos wins %":
    case "wins % duo":
    case "wins % duos":
      title = "Duos Win Percentage";
      return makeEmbed(title, users.sort((a, b) => ((((a.stats.WinsDuos.value / ((a.stats.GamesDuos.value - a.stats.WinsDuos.value) === 0 ? 1 : (a.stats.GamesDuos.value - a.stats.WinsDuos.value)))) * 100).toFixed(2) > ((((b.stats.Wins.value / ((b.stats.GamesDuos.value - b.stats.WinsDuos.value) === 0 ? 1 : (b.stats.GamesDuos.value - b.stats.WinsDuos.value)))) * 100).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **%${(((user.stats.WinsDuos.value / ((user.stats.GamesDuos.value - user.stats.WinsDuos.value) === 0 ? 1 : (user.stats.GamesDuos.value - user.stats.WinsDuos.value)))) * 100).toFixed(2)}**`,
          inline: false
        }
      }));
    
    case "squad win percent":
    case "squads win percent":
    case "win percent squad":
    case "win percent squads":
    case "squad wins percent":
    case "squads wins percent":
    case "wins percent squad":
    case "wins percent squads":
    case "squad win percentage":
    case "squads win percentage":
    case "win percentage squad":
    case "win percentage squads":
    case "squad wins percentage":
    case "squads wins percentage":
    case "wins percentage squad":
    case "wins percentage squads":
    case "squad win %":
    case "squads win %":
    case "win % squad":
    case "win % squads":
    case "squad wins %":
    case "squads wins %":
    case "wins % squad":
    case "wins % squads":
      title = "Squads Win Percentage";
      return makeEmbed(title, users.sort((a, b) => ((((a.stats.WinsSquads.value / ((a.stats.GamesSquads.value - a.stats.WinsSquads.value) === 0 ? 1 : (a.stats.GamesSquads.value - a.stats.WinsSquads.value)))) * 100).toFixed(2) > ((((b.stats.WinsSquads.value / ((b.stats.GamesSquads.value - b.stats.WinsSquads.value) === 0 ? 1 : (b.stats.GamesSquads.value - b.stats.WinsSquads.value)))) * 100).toFixed(2)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **%${(((user.stats.WinsSquads.value / ((user.stats.GamesSquads.value - user.stats.WinsSquads.value) === 0 ? 1 : (user.stats.GamesSquads.value - user.stats.WinsSquads.value)))) * 100).toFixed(2)}**`,
          inline: false
        }
      }));

    case "solos top 5":
    case "solo top 5":
    case "top 5":
    case "solos top x":
    case "solo top x":
    case "solos top":
    case "solo top":
    case "solos top5":
    case "solo top5":
    case "solos topx":
    case "solo topx":
      title = "Solos Top 5 Placements";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Top5.value > b.stats.Top5.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Top5.value}**`,
          inline: false
        }
      }));

    case "duos top 3":
    case "duo top 3":
    case "top 3":
    case "duos top x":
    case "duo top x":
    case "duos top":
    case "duo top":
    case "duos top3":
    case "duo top3":
    case "duos topx":
    case "duo topx":
      title = "Duos Top 3 Placements";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Top3Duos.value > b.stats.Top3Duos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Top3Duos.value}**`,
          inline: false
        }
      }));

    case "squads top 2":
    case "squad top 2":
    case "top 2":
    case "squads top x":
    case "squad top x":
    case "squads top":
    case "squad top":
    case "squads top2":
    case "squad top2":
    case "squads topx":
    case "squad topx":
      title = "Squads Top 2 Placements";
      return makeEmbed(title, users.sort((a, b) => (a.stats.Top2Squads.value > b.stats.Top2Squads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Top2Squads.value}**`,
          inline: false
        }
      }));

    case "kill":
    case "all kill":
    case "all gamemode kill":
    case "all kills":
    case "all gamemode kills":
    case "kills":
    case "all gamemodes kill":
    case "all gamemodes kills":
      title = "All Gamemode Kills";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Kills.value + a.stats.KillsDuos.value + a.stats.KillsSquads.value) > (b.stats.Kills.value + b.stats.KillsDuos.value + b.stats.KillsSquads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Kills.value + user.stats.KillsDuos.value + user.stats.KillsSquads.value}**`,
          inline: false
        }
      }));

    case "death":
    case "all death":
    case "all gamemode death":
    case "all deaths":
    case "all gamemode deaths":
    case "deaths":
    case "all gamemodes deaths":
    case "all gamemodes death":
      title = "All Gamemodes Deaths";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Deaths.value + a.stats.DeathsDuos.value + a.stats.DeathsSquads.value) > (b.stats.Deaths.value + b.stats.DeathsDuos.value + b.stats.DeathsSquads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Deaths.value + user.stats.DeathsDuos.value + user.stats.DeathsSquads.value}**`,
          inline: false
        }
      }));
    
    case "all kd":
    case "all gamemode kd":
    case "kd":
    case "k/d":
    case "all k/d":
    case "all gamemode k/d":
    case "all gamemodes kd":
    case "all gamemodes k/d":
      title = "All Gamemodes Kill/Death Ratio";
      return makeEmbed(title, users.sort((a, b) => {
        const kills_a = a.stats.Kills.value + a.stats.KillsDuos.value + a.stats.KillsSquads.value;
        let deaths_a = a.stats.Deaths.value + a.stats.DeathsDuos.value + a.stats.DeathsSquads.value;
        if (deaths_a <= 0) deaths_a = 1;

        const kills_b = b.stats.Kills.value + b.stats.KillsDuos.value + b.stats.KillsSquads.value;
        let deaths_b = b.stats.Deaths.value + b.stats.DeathsDuos.value + b.stats.DeathsSquads.value;
        if (deaths_b <= 0) deaths_b = 1;
        return ((kills_a / deaths_a).toFixed(2) > (kills_b / deaths_b).toFixed(2)) ? 1 : -1;
      }).reverse().map((user: SARdata, index: number) => {
        const kills = user.stats.Kills.value + user.stats.KillsDuos.value + user.stats.KillsSquads.value;
        let deaths = user.stats.Deaths.value + user.stats.DeathsDuos.value + user.stats.DeathsSquads.value;
        if (deaths <= 0) deaths = 1;

        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${(kills / deaths).toFixed(2)}**`,
          inline: false
        }
      }));

    case "top":
    case "top x":
    case "topx":
    case "top placements":
    case "all top placements":
    case "top x placements":
    case "topx placements":
    case "all gamemode top placements":
    case "all gamemode topx placements":
    case "all topx placements":
    case "all top x placements":
    case "top placement":
    case "all topx":
    case "all top":
    case "all top x":
    case "all top placement":
    case "top x placement":
    case "top x placement":
    case "all gamemode top placement":
    case "all gamemode topx placement":
    case "all topx placements":
    case "all top x placement":
    case "all gamemode top x placements":
    case "all gamemodes top placements":
    case "all gamemodes topx placements":
    case "all gamemodes top x placements":
    case "all gamemodes top placement":
    case "all gamemodes topx placement":
    case "all gamemodes top x placement":
      title = "Top 5 Solos + Top 3 Duos + Top 2 Squads";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Top5.value + a.stats.Top3Duos.value + a.stats.Top2Squads.value) > (b.stats.Top5.value + b.stats.Top3Duos.value + b.stats.Top2Squads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Top5.value + user.stats.Top3Duos.value + user.stats.Top2Squads.value}**`,
          inline: false
        }
      }));

    case "win":
    case "all win":
    case "all gamemode win":
    case "all wins":
    case "all gamemode wins":
    case "wins":
    case "all gamemodes win":
    case "all gamemodes wins":
      title = "All Gamemodes Wins";
      return makeEmbed(title, users.sort((a, b) => ((a.stats.Wins.value + a.stats.WinsDuos.value + a.stats.WinsSquads.value) > (b.stats.Wins.value + b.stats.WinsDuos.value + b.stats.WinsSquads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.Wins.value + user.stats.WinsDuos.value + user.stats.WinsSquads.value}**`,
          inline: false
        }
      }));

    case "lose":
    case "all lose":
    case "all gamemode lose":
    case "all gamemodes lose":
    case "loss":
    case "all loss":
    case "all gamemode loss":
    case "all losses":
    case "all gamemode losses":
    case "losses":
    case "all gamemodes loss":
    case "all gamemodes losses":
      title = "All Gamemodes Losses";
      return makeEmbed(title, users.sort((a, b) => (((a.stats.Games.value - a.stats.Wins.value) + (a.stats.GamesDuos.value - a.stats.WinsDuos.value) + (a.stats.GamesSquads.value - a.stats.WinsSquads.value)) > ((b.stats.Games.value - b.stats.Wins.value) + (b.stats.GamesDuos.value - b.stats.WinsDuos.value) + (b.stats.GamesSquads.value - b.stats.WinsSquads.value)) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${((user.stats.Games.value - user.stats.Wins.value) + (user.stats.GamesDuos.value - user.stats.WinsDuos.value) + (user.stats.GamesSquads.value - user.stats.WinsSquads.value))}**`,
          inline: false
        }
      }));

    case "win percentage":
    case "wins percentage":
    case "all wins percentage":
    case "all win percentage":
    case "all gamemode wins percentage":
    case "all gamemode win percentage":
    case "all gamemodes wins percentage":
    case "all gamemodes win percentage":
    case "win percent":
    case "wins percent":
    case "all wins percent":
    case "all win percent":
    case "all gamemode wins percent":
    case "all gamemode win percent":
    case "all gamemodes wins percent":
    case "all gamemodes win percent":
    case "win %":
    case "wins %":
    case "all wins %":
    case "all win %":
    case "all gamemode wins %":
    case "all gamemode win %":
    case "all gamemodes wins %":
    case "all gamemodes win %":
      title = "All Gamemodes Wins Percentage";      //todo fix this
      return makeEmbed(title, users.sort((a, b) => {
        const wins_a = a.stats.Wins.value + a.stats.WinsDuos.value + a.stats.WinsSquads.value;
        const games_a = a.stats.Games.value + a.stats.GamesDuos.value + a.stats.GamesSquads.value;
        let losses_a = games_a - wins_a;
        if (losses_a <= 0) losses_a = 1;
        
        const wins_b = b.stats.Wins.value + b.stats.WinsDuos.value + b.stats.WinsSquads.value;
        const games_b = b.stats.Games.value + b.stats.GamesDuos.value + b.stats.GamesSquads.value;
        let losses_b = games_b - wins_b;

        if (losses_b <= 0) losses_b = 1;
        return parseFloat((wins_a / losses_a * 100).toFixed(2)) > parseFloat((wins_b / losses_b * 100).toFixed(2)) ? 1 : -1;
      
      }).reverse().map((user: SARdata, index: number) => {
        const wins = user.stats.Wins.value + user.stats.WinsDuos.value + user.stats.WinsSquads.value;;
        const games = user.stats.Games.value + user.stats.GamesDuos.value + user.stats.GamesSquads.value;
        let losses = games - wins;
        if (losses <= 0) losses = 1;

        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **%${(wins / losses * 100).toFixed(2)}**`,
          inline: false
        }
      }));

    case "solos highest":
    case "solos most":
    case "solos highest kills":
    case "solos most kills":
    case "solos top kills":
    case "solo highest":
    case "solo most":
    case "solo most kills":
    case "solo top kills":
    case "solos high":
    case "solo high":
    case "solo high kills":
    case "solos high kills":
    case "solo high kill":
    case "solos high kill":
    case "solo most":
    case "solo most kill":
    case "solo top kills":
    case "solo top kill":
    case "top kill solos":
    case "top kills solos":
    case "top kill solo":
    case "top kills solo":
    case "most kills solo":
    case "most kill solo":
    case "most kills solos":
    case "most kill solos":
      title = "Most Kills In A Solos Game";
      return makeEmbed(title, users.sort((a, b) => (a.stats.MostKills.value > b.stats.MostKills.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.MostKills.value}**`,
          inline: false
        }
      }));

    case "duos highest":
    case "duos most":
    case "duos highest kills":
    case "duos most kills":
    case "duos top kills":
    case "duo highest":
    case "duo most":
    case "duo most kills":
    case "duo top kills":
    case "duos high":
    case "duo high":
    case "duo high kills":
    case "duos high kills":
    case "duo high kill":
    case "duos high kill":
    case "duo most":
    case "duo most kill":
    case "duo top kills":
    case "duo top kill":
    case "top kill duos":
    case "top kills duos":
    case "top kill duo":
    case "top kills duo":
    case "most kills duo":
    case "most kill duo":
    case "most kills duos":
    case "most kill duos":
      title = "Most Kills In A Duos Game";
      return makeEmbed(title, users.sort((a, b) => (a.stats.MostKillsDuos.value > b.stats.MostKillsDuos.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.MostKillsDuos.value}**`,
          inline: false
        }
      }));

    case "squads highest":
    case "squads most":
    case "squads highest kills":
    case "squads most kills":
    case "squads top kills":
    case "squad highest":
    case "squad most":
    case "squad most kills":
    case "squad top kills":
    case "squads high":
    case "squad high":
    case "squad high kills":
    case "squads high kills":
    case "squad high kill":
    case "squads high kill":
    case "squad most":
    case "squad most kill":
    case "squad top kills":
    case "squad top kill":
    case "top kill squads":
    case "top kills squads":
    case "top kill squad":
    case "top kills squad":
    case "most kills squad":
    case "most kill squad":
    case "most kills squads":
    case "most kill squads":
      title = "Most Kills In A Squads Game";
      return makeEmbed(title, users.sort((a, b) => (a.stats.MostKillsSquads.value > b.stats.MostKillsSquads.value ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${user.stats.MostKillsSquads.value}**`,
          inline: false
        }
      }));

    case "all highest":
    case "all most":
    case "all highest kills":
    case "all most kills":
    case "all top kills":
    case "all gamemodes highest":
    case "all gamemodes most":
    case "all gamemodes most kills":
    case "all gamemodes top kills":
    case "all high":
    case "all gamemodes high":
    case "all gamemodes high kills":
    case "all high kills":
    case "all gamemodes high kill":
    case "all high kill":
    case "all gamemodes most":
    case "all gamemodes most kill":
    case "all gamemodes top kills":
    case "all gamemodes top kill":
    case "top kill all":
    case "top kills all":
    case "top kill all gamemodes":
    case "top kills all gamemodes":
    case "most kills all gamemodes":
    case "most kill all gamemodes":
    case "most kills all":
    case "most kill all":
    case "most kills":
    case "most kill":
      title = "Most Kills In Any Gamemode";
      return makeEmbed(title, users.sort((a, b) => (Math.max(a.stats.MostKills.value, a.stats.MostKillsDuos.value, a.stats.MostKillsSquads.value) > Math.max(b.stats.MostKills.value, b.stats.MostKillsDuos.value, b.stats.MostKillsSquads.value) ? 1 : -1)).reverse().map((user: SARdata, index: number) => {
        return { 
          name: `#${index + 1} - ${user.username}`,
          value: `${title}: **${Math.max(user.stats.MostKills.value, user.stats.MostKillsDuos.value, user.stats.MostKillsSquads.value)}**`,
          inline: false
        }
      }));

    default:
      return { embeds: [{
        color: Colors.red,
        title: "Invalid Stat",
        description: "The given stat does not exist. Type `/stats-list` for a list of all tracked player statistics",
        timestamp: new Date(),
        footer: { text: "Invalid Stat", iconURL: icon }
      }]};
  }
}