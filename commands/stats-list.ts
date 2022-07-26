import { Colors } from "../colors";
import { icon } from "../icon";

export function statsList(): object {
  return { embeds: [{
    color: Colors.cyan,
    title: "List Of Comparable Player Statistics",
    description: "Kills, Deaths, K/D\nWins, Losses, Win Percentage\n\nSolos Kills, Solos Deaths, Solos K/D\nSolos Wins, Solos Losses, Solos Win Percentage\n\nDuos Kills, Duos Deaths, Duos K/D,\nDuos Wins, Duos Losses, Duos Win Percentage\n\nSquads Kills, Squads Deaths, Squads K/D,\nSquads Wins, Squads Losses, Squads Win Percentage\n\nSolos Top **5**, Duos Top **3**, Squads Top **2**, All Top **X**",
    timestamp: new Date(),
    footer: { text: "List Of Comparable Player Statistics", iconURL: icon }
  }]};
}