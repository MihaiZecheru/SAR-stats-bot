import { ISARdata } from "./TSARdata";
import { IApplicationUser, ApplicationUser } from "./ApplicationUser";
const fetch = require("node-fetch");

export class Api {
  static url = "https://sarstats.fireapis.com/userdata";

  /**
   * Gets all users
   * @returns {Array<IApplicationUser>} all users
   */
  static async getAll() {
    const req = await fetch(`${this.url}/all`, {
      method: 'GET',
      headers: this.makeHeaders()
    }).then(r => r.json());

    return req.data;
  }

  /**
   * Make the fireapi headers
   * @returns {object} the fireapi headers
   */
  static makeHeaders() {
    return {
      "X-API-ID": 683,
      "X-CLIENT-TOKEN": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfa2V5IjoiNTk2Mjk5M2ItM2QzMi00ZjA2LTljNDMtZjcxN2Q3ODc0NzVmIiwidGVuYW50X2lkIjo4NDAsImp0aV9rZXkiOiI0ZWQ3M2E5Ni0wNzA0LTExZWQtOGYyYy0wYTU4YTlmZWFjMDIifQ.ritzHDgyua_E_eRkcB30A10Fsa7UnW4PQ0cZ2zSP4As",
      "Content-Type": "application/json",
    };
  }

  /**
   * Get a user by their discord ID
   * @param {string} id the discord ID to search for
   * @returns {IApplicationUser} the user
   */
  static async getUserByDiscordId(id) {
    const req = await fetch(`${this.url}/?discordid=${id}`, {
      method: 'GET',
      headers: this.makeHeaders()
    }).then(r => r.json());

    return req.data.length ? req.data[0] : false;
  }

  /**
   * Change a user's name in the database
   * @param {string} discordid the discord ID of the user
   * @param {string} newName the user's new name
   */
  static async changeName(discordid, newName) {
    const req = (await fetch(`${this.url}/?discordid=${discordid}`, {
      method: 'GET',
      headers: this.makeHeaders()
    }).then(r => r.json())).data[0];

    return await fetch(`${this.url}/${req.id}`, {
      method: 'PUT',
      headers: this.makeHeaders(),
      body: JSON.stringify({
        name: newName,
        steamid: req.steamid,
        discordid: req.discordid
      })
    }).then(r => r.json());
  }

  /**
   * 
   * @param {string} steamid the steam profile id of the user
   * @returns {ISARdata} the SARdata
   */
  static async getSARdata(steamid) {
    return await fetch(`https://royale.pet/api/player/${steamid}/stats`, {
      method: 'GET'
    }).then(r => r.json());
  }

  /**
   * Gets all registered user's discord IDs
   * @returns {Array<string>} an array of all of the registered user's discord IDs
   */
  static async getAllUserDiscordIds() {
    return (await fetch(`${this.url}/all`, {
      method: 'GET',
      headers: this.makeHeaders()
    }).then(r => r.json())).data.map(au => au.discordid);
  }

  /**
   * Post a user to the database
   * @param {ApplicationUser} user the user
   * @returns {IApplicationUser} the api response
   */
  static async postUser(user) {
    return await fetch(this.url, {
      method: 'POST',
      headers: this.makeHeaders(),
      body: user.pack()
    }).then(r => r.json());
  }

  /**
   * delete a user from the database
   * @param {IApplicationUser} user 
   */
  static async deleteUser(user) {
    await fetch(`${this.url}/${user.id}`, {
      method: 'DELETE',
      headers: this.makeHeaders()
    });
  }
}