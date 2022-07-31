import { ISARdata } from "../TSARdata";
import { Api } from "../api";
import { ApplicationUser } from "../ApplicationUser";
import { Colors } from "../colors";
import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { icon } from "../icon";

export type TField = { name: string, value: string, inline: boolean };
const MAX_PAGES: number = 4;
let userPages: { [studentid: string]: number } = {};
(async () => {
  (await Api.getAllUserDiscordIds()).forEach((discordid: string) => {
    userPages[discordid.toString()] = 1;
  });
})();

const comps = (new MessageActionRow()
  .addComponents(new MessageButton()
    .setLabel("| Front")
    .setEmoji('⏮️')
    .setStyle("PRIMARY")
    .setCustomId("stats-front")
  )
  .addComponents(new MessageButton()
    .setLabel("| Previous")
    .setEmoji('⬅️')
    .setStyle("SECONDARY")
    .setCustomId("stats-previous")
  )
  .addComponents(new MessageButton()
    .setLabel("| Close")
    .setEmoji("🔒")
    .setStyle("DANGER")
    .setCustomId("stats-close")
  )
  .addComponents(new MessageButton()
    .setLabel("| Next")
    .setEmoji('▶️')
    .setStyle("SECONDARY")
    .setCustomId("stats-next")
  )
  .addComponents(new MessageButton()
    .setLabel("| Back")
    .setEmoji('⏭️')
    .setStyle("PRIMARY")
    .setCustomId("stats-back")
  )
);

function makePages(data: ISARdata): { [page_num: string]: Array<TField> } {
  let solo;
  try {
    solo = { deaths: data.stats.Deaths.value, games_played: data.stats.Games.value, kills: data.stats.Kills.value, most_kills: data.stats.MostKills.value, top_5: data.stats.Top5.value, wins: data.stats.Wins.value };
  } catch (e) {
    solo = { deaths: 0, games_played: 0, kills: 0, most_kills: 0, top_5: 0, wins: 0 }
  
  }
  let duos;
  try {
    duos = { deaths: data.stats.DeathsDuos.value, games_played: data.stats.GamesDuos.value, kills: data.stats.KillsDuos.value, most_kills: data.stats.MostKillsDuos.value, top_3: data.stats.Top3Duos.value, wins: data.stats.WinsDuos.value };
  } catch (e) {
    duos = { deaths: 0, games_played: 0, kills: 0, most_kills: 0, top_3: 0, wins: 0 }
  }

  let squads;
  try {
    squads = { deaths: data.stats.DeathsSquads.value, games_played: data.stats.GamesSquads.value, kills: data.stats.KillsSquads.value, most_kills: data.stats.MostKillsSquads.value, top_2: data.stats.Top2Squads.value, wins: data.stats.WinsSquads.value };
  } catch (e) {
    squads = { deaths: 0, games_played: 0, kills: 0, most_kills: 0, top_5: 0, wins: 0 };
  }
  
  let control_point;
  try {
    control_point = { deaths: data.stats.DeathsCustom1B.value, games_played: data.stats.GamesCustom1B.value, kills: data.stats.KillsCustom1B.value, most_kills: data.stats.MostKillsCustom1B.value, wins: data.stats.WinsCustom1B.value };
  } catch(e) {
    control_point = { deaths: 0, games_played: 0, kills: 0, most_kills: 0, wins: 0 };
  }

  let mystery_mode;
  try {
    mystery_mode = { deaths: data.stats.DeathsCustom2.value, games_played: data.stats.GamesCustom2.value, kills: data.stats.KillsCustom2.value, most_kills: data.stats.MostKillsCustom2.value };
  } catch (e) {
    mystery_mode = { deaths: 0, games_played: 0, kills: 0, most_kills: 0 };
  }

  let combat_stats;
  try {
    combat_stats = { all_banana_slips: data.stats.BananaHits.value, damage_dealt: data.stats.DamageDealt.value, enemy_armor_broken: data.stats.EnemyArmorBroken.value, enemy_banana_slips: data.stats.BananaHitsEnemyOnly.value, healing: data.stats.Healing.value, items_destroyed: data.stats.DestructiblesDestroyed.value, skunk_bomb_damage_dealt: data.stats.SkunkBombDamageDealt.value };
  } catch (e) {
    combat_stats = { all_banana_slips: 0, damage_dealt: 0, enemy_armor_broken: 0, enemy_banana_slips: 0, healing: 0, items_destroyed: 0, skunk_bomb_damage_dealt: 0 }
  }

  let milestones;
  try {
    milestones = { dancing_in_the_rain: data.stats.DancingInTheRain.value, dr_dognas_secret_lab: data.stats.NPCLab.value, find_the_sasr_hideout: data.stats.BarnRebelDoor.value, no_dancing: data.stats.NoDancing.value, the_first_super_skullcat: data.stats.NpcSphynx.value };
  } catch (e) {
    milestones = { dancing_in_the_rain: 0, dr_dognas_secret_lab: 0, find_the_sasr_hideout: 0, no_dancing: 0, the_first_super_skullcat: 0 };
  }

  let kill_stats;
  try {
    kill_stats = { ak: data.stats.KillsAK.value, bow: data.stats.KillsBow.value, crossbow: data.stats.KillsCrossbow.value, dart: data.stats.KillsDart.value, deagle: data.stats.KillsDeagle.value, dual_pistol: data.stats.KillsDualPistol.value,
      egg_launcher: data.stats.KillsEgg.value, emu: data.stats.EmuKills.value, grenade: data.stats.GrenadeKills.value, hamster_ball: data.stats.VehicleKills.value, hunting_rifle: data.stats.KillsHuntingRifle.value, jag_7: data.stats.KillsJag7.value,
      m16: data.stats.KillsM16.value, magnum: data.stats.KillsMagnum.value, melee: data.stats.MeleeKills.value, minigun: data.stats.KillsMinigun.value, pistol: data.stats.KillsPistol.value, shotgun: data.stats.KillsShotgun.value,
      silenced_pistol: data.stats.KillsSilencedPistol.value, smg: data.stats.KillsSMG.value, sniper: data.stats.KillsSniper.value, thomas_gun: data.stats.KillsThomas.value };
  } catch (e) {
    kill_stats = { ak: 0, bow: 0, crossbow: 0, dart: 0, deagle: 0, dual_pistol: 0, egg_launcher: 0, emu: 0, grenade: 0, hamster_ball: 0, hunting_rifle: 0, jag_7: 0, m16: 0, magnum: 0, melee: 0, minigun: 0, pistol: 0, shotgun: 0, silenced_pistol: 0, smg: 0, sniper: 0, thomas_gun: 0 };
  }

  let other_stats;
  try {
    other_stats = { banan_offerings: data.stats.BananOfferings.value, bow_hits_in_one_match: data.stats.BowHitsOneMatch.value, campfires_used: data.stats.CampfiresUsed.value, chest_opens: data.stats.ChestOpens.value,
      coconuts_ate: data.stats.CoconutsAte.value, distance_travelled: data.stats.DistanceTraveled.value, distance_travelled_on_ice: data.stats.DistanceTraveledIceW2.value, grass_cut: data.stats.GrassCut.value,
      health_juice_drank: data.stats.HealthJuiceDrank.value, mole_crates_opened: data.stats.MoleCrates.value, mushrooms_ate: data.stats.MushroomsAte.value, parachute_splats: data.stats.ParachuteSplats.value, playtime: data.stats.TimePlayedSeconds.value, rat_gg: data.stats.RatGG.value, super_jump_rolls: data.stats.SuperJumpRolls.value, tape_used: data.stats.TapeUsed.value };
  } catch (e) {
    other_stats = { banan_offerings: 0, bow_hits_in_one_match: 0, campfires_used: 0, chest_opens: 0, coconuts_ate: 0, distance_travelled: 0, distance_travelled_on_ice: 0, grass_cut: 0, health_juice_drank: 0, mole_crates_opened: 0, mushrooms_ate: 0, parachute_splats: 0, playtime: 0, rat_gg: 0, super_jump_rolls: 0, tape_used: 0 };
  }
  
  return {
    "1": [{ name: "All Gamemodes", value: `Kills: .......................... **${data.stats.Kills.value + data.stats.KillsDuos.value + data.stats.KillsSquads.value}**\nDeaths: .................... **${data.stats.Deaths.value + data.stats.DeathsDuos.value + data.stats.DeathsSquads.value}**\nKill/Death Ratio: .. \`${((data.stats.Kills.value + data.stats.KillsDuos.value + data.stats.KillsSquads.value) / ((data.stats.Deaths.value + data.stats.DeathsDuos.value + data.stats.DeathsSquads.value) === 0 ? 1 : (data.stats.Deaths.value + data.stats.DeathsDuos.value + data.stats.DeathsSquads.value))).toFixed(2)}\`\nTop X Placements**:** \`${data.stats.Top5.value + data.stats.Top3Duos.value + data.stats.Top2Squads.value}\`\nGames: ................... \`${data.stats.Games.value + data.stats.GamesDuos.value + data.stats.GamesSquads.value}\`\nWins: ....................... **${data.stats.Wins.value + data.stats.WinsDuos.value + data.stats.WinsSquads.value}**\nLosses: .................... **${(data.stats.Games.value + data.stats.GamesDuos.value + data.stats.GamesSquads.value) - (data.stats.Wins.value + data.stats.WinsDuos.value + data.stats.WinsSquads.value)}**\nWin Percentage: .. \`%${((((data.stats.Wins.value + data.stats.WinsDuos.value + data.stats.WinsSquads.value) / (((data.stats.Games.value + data.stats.GamesDuos.value + data.stats.GamesSquads.value) - (data.stats.Wins.value + data.stats.WinsDuos.value + data.stats.WinsSquads.value)) === 0 ? 1 : ((data.stats.Games.value + data.stats.GamesDuos.value + data.stats.GamesSquads.value) - (data.stats.Wins.value + data.stats.WinsDuos.value + data.stats.WinsSquads.value))))) * 100).toFixed(2)}\``, inline: false }, { name: "Solo", value: `Kills: .......................... **${solo.kills}**\nDeaths: .................... **${solo.deaths}**\nKill/Death Ratio: .. \`${(solo.kills / (solo.deaths === 0 ? 1 : solo.deaths)).toFixed(2)}\`\nTop 5 Placements**:** \`${solo.top_5}\`\nGames: ................... \`${solo.games_played}\`\nWins: ....................... **${solo.wins}**\nLosses: .................... **${solo.games_played - solo.wins}**\nWin Percentage: .. \`%${(((solo.wins / ((solo.games_played - solo.wins) === 0 ? 1 : (solo.games_played - solo.wins)))) * 100).toFixed(2)}\``, inline: false }, { name: "Duos", value: `Kills: .......................... **${duos.kills}**\nDeaths: .................... **${duos.deaths}**\nKill/Death Ratio: .. \`${(duos.kills / (duos.deaths === 0 ? 1 : duos.deaths)).toFixed(2)}\`\nTop 5 Placements**:** \`${duos.top_3}\`\nGames: ................... \`${duos.games_played}\`\nWins: ....................... **${duos.wins}**\nLosses: .................... **${duos.games_played - duos.wins}**\nWin Percentage: .. \`%${(((duos.wins / ((duos.games_played - duos.wins) === 0 ? 1 : (duos.games_played - duos.wins)))) * 100).toFixed(2)}\``, inline: false }, { name: "Squads", value: `Kills: .......................... **${squads.kills}**\nDeaths: .................... **${squads.deaths}**\nKill/Death Ratio: .. \`${(squads.kills / (squads.deaths === 0 ? 1 : squads.deaths)).toFixed(2)}\`\nTop 5 Placements**:** \`${squads.top_2}\`\nGames: ................... \`${squads.games_played}\`\nWins: ....................... **${squads.wins}**\nLosses: .................... **${squads.games_played - squads.wins}**\nWin Percentage: .. \`%${(((squads.wins / ((squads.games_played - squads.wins) === 0 ? 1 : (squads.games_played - squads.wins)))) * 100).toFixed(2)}\``, inline: false }],
    "2": [{ name: "Control Point", value: `Deaths: **${control_point.deaths}**\nGames Played: **${control_point.games_played}**\nKills: **${control_point.kills}**\nMost Kills: **${control_point.most_kills}**\nWins: **${control_point.wins}**`, inline: false }, { name: "Mystery Mode", value: `Deaths: **${mystery_mode.deaths}**\nGames Played: **${mystery_mode.games_played}**\nKills: **${mystery_mode.kills}**\nMost Kills: **${mystery_mode.most_kills}**`, inline: false }, { name: "Milestones", value: `Dancing In The Rain: **${milestones.dancing_in_the_rain}**\nDr. Dogna's Secret Lab: **${milestones.dr_dognas_secret_lab}**\nFind The SASR Hideout: **${milestones.find_the_sasr_hideout}**\nNo Dancing: **${milestones.no_dancing}**\nThe First Super Skullcat: **${milestones.the_first_super_skullcat}**`, inline: false }],
    "3": [{ name: "Weapon Statistics", value: `AK Kills: **${kill_stats.ak}**\nBow Kills: **${kill_stats.bow}**\nCrossbow Kills: **${kill_stats.crossbow}**\nDart Kills: **${kill_stats.dart}**\nDeagle Kills: **${kill_stats.deagle}**\nDual Pistol Kills: **${kill_stats.dual_pistol}**\nEgg Launcher Kills: **${kill_stats.egg_launcher}**\nEmu Kills: **${kill_stats.emu}**\nGrenade Kills: **${kill_stats.grenade}**\nHamster Ball Kills: **${kill_stats.hamster_ball}**\nHunting Rifle Kills: **${kill_stats.hunting_rifle}**\nJag-7 Kills: **${kill_stats.jag_7}**\nM16 Kills: **${kill_stats.m16}**\nMagnum Kills: **${kill_stats.magnum}**\nMelee Kills: **${kill_stats.melee}**\nMinigun Kills: **${kill_stats.minigun}**\nPistol Kills: **${kill_stats.pistol}**\nShotgun Kills: **${kill_stats.shotgun}**\nSilenced Pistol Kills: **${kill_stats.silenced_pistol}**\nSmg Kills: **${kill_stats.smg}**\nSniper Kills: **${kill_stats.sniper}**\nThomas Gun Kills: **${kill_stats.thomas_gun}**`, inline: false }],
    "4": [{ name: "Combat Statistics", value: `All Banana Slips: **${combat_stats.all_banana_slips}**\nDamage Dealt: **${combat_stats.damage_dealt}**\nEnemy Armor Broken: **${combat_stats.enemy_armor_broken}**\nEnemy Banana Slips: **${combat_stats.enemy_banana_slips}**\nHealing: **${combat_stats.healing}**\nItems Destroyed: **${combat_stats.items_destroyed}**\nSkunk Bomb Damage Dealt: **${combat_stats.skunk_bomb_damage_dealt}**`, inline: false }, { name: "Other Statistics", value: `Banan Offerings: **${other_stats.banan_offerings}**\nBow Hits In One Match: **${other_stats.bow_hits_in_one_match}**\nCampfires Used: **${other_stats.campfires_used}**\nChest Opens: **${other_stats.chest_opens}**\nCoconuts Ate: **${other_stats.coconuts_ate}**\nDistance Travelled: **${other_stats.distance_travelled}**\nDistance Travelled On Ice: **${other_stats.distance_travelled_on_ice}**\nGrass Cut: **${other_stats.grass_cut}**\nHealth Juice Drank: **${other_stats.health_juice_drank}**\nMole Crates Opened: **${other_stats.mole_crates_opened}**\nMushrooms Ate: **${other_stats.mushrooms_ate}**\nParachute Splats: **${other_stats.parachute_splats}**\nPlaytime: **${other_stats.playtime}**\nRat GG: **${other_stats.rat_gg}**\nSuper Jump Rolls: **${other_stats.super_jump_rolls}**\nTape Used: **${other_stats.tape_used}**`, inline: false }],
  };
}

function getPage(pages: { [page_num: string]: Array<TField> }, number: number): Array<TField> {
  return pages[number.toString()];
}

export async function stats(interaction: CommandInteraction, userid: string): Promise<object> {
  const user: ApplicationUser = new ApplicationUser(await Api.getUserByDiscordId(userid));
  const { name, steamid, discordid } = user;
  const data: ISARdata = await Api.getSARdata(steamid);
  const pages = makePages(data);

  const filter = (btnInt: any) => {
    return interaction.user.id === btnInt.user.id;
  }

  const collector = (interaction.channel as TextChannel).createMessageComponentCollector({
    filter,
    max: 1000,
    time: 90 * 1000
  });

  collector.on('collect', async (b_interaction: ButtonInteraction) => {
    // resolve the button interaction and prevent the "interaction failed" message
    b_interaction.deferUpdate();

    switch (b_interaction.customId) {
      case "stats-front":
      userPages[userid] = 1;
      await interaction.editReply({ embeds: [{
          color: Colors.cyan,
          title: `${name}'s Stats`,
          fields: getPage(pages, userPages[userid]),
          timestamp: new Date(),
          footer: { text: `${name}'s Stats`, iconURL: icon }
        }],
          components: [ comps ]
        });
        break;
      
      case "stats-previous":
        if (userPages[userid] > 1) userPages[userid]--;
        await interaction.editReply({ embeds: [{
          color: Colors.cyan,
          title: `${name}'s Stats`,
          fields: getPage(pages, userPages[userid]),
          timestamp: new Date(),
          footer: { text: `${name}'s Stats`, iconURL: icon }
        }],
          components: [ comps ]
        });
        break;
      
      case "stats-close":
        collector.stop();
        break;
      
      case "stats-next":
        if (userPages[userid] < MAX_PAGES) userPages[userid]++;
        await interaction.editReply({ embeds: [{
          color: Colors.cyan,
          title: `${name}'s Stats`,
          fields: getPage(pages, userPages[userid]),
          timestamp: new Date(),
          footer: { text: `${name}'s Stats`, iconURL: icon }
        }],
          components: [ comps ]
        });
        break;

      case "stats-back":
        userPages[userid] = MAX_PAGES;
        await interaction.editReply({ embeds: [{
          color: Colors.cyan,
          title: `${name}'s Stats`,
          fields: getPage(pages, userPages[userid]),
          timestamp: new Date(),
          footer: { text: `${name}'s Stats`, iconURL: icon }
        }],
          components: [ comps ]
        });
        break;
    }
  });

  collector.on('end', async (collection) => {
    await interaction.editReply({embeds: [{
      color: Colors.red,
      title: `Stats Closed`,
      description: "The stats embed has been hidden. Type `/stats` to view your stats again.",
      timestamp: new Date(),
      footer: { text: `Stats Closed`, iconURL: icon }
    }],
      components: [] // remove buttons
    })
  });

  return { embeds: [{
    color: Colors.cyan,
    title: `${name}'s Stats`,
    fields: getPage(pages, 1),
    timestamp: new Date(),
    footer: { text: `${name}'s Stats`, iconURL: icon }
  }],
    components: [ comps ]
  };
}
