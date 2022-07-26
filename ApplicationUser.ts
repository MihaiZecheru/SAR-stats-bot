import { Api } from "./api";

export interface IApplicationUser {
  id: number,
  name: string,
  steamid: string,
  discordid: string
}

export class ApplicationUser implements IApplicationUser {
  id: number;
  name: string;
  steamid: string;
  discordid: string;

  constructor (applicationUser: IApplicationUser) {
    this.id = applicationUser.id;
    this.name = applicationUser.name;
    this.steamid = applicationUser.steamid;
    this.discordid = applicationUser.discordid;
  }

  pack() {
    return JSON.stringify({
      name: this.name,
      steamid: this.steamid,
      discordid: this.discordid
    });
  }
}