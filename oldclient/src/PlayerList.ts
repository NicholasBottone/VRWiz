import {
  createControllers,
  updateControllers,
  removeControllers,
} from "./controllers";
import User from "./types/User";

/**
 * class for the list of player objects connected to the game other than the current user.
 */
export default class PlayerList {
  clientsObj: { [id: string]: User };

  constructor() {
    this.clientsObj = {};
  }

  /**
   * takes in an id and creates a new player object with their id, and default pos and rot for left and right controlers
   */
  createNewPlayer(id: string) {
    console.log(`user ${id} joined`);
    const userObj: User = {
      id,
      left: { pos: "0 0 0", rot: "0 0 0" },
      right: { pos: "0 0 0", rot: "0 0 0" },
    };
    this.clientsObj[id] = userObj;
    createControllers(userObj, id);
  }

  getPlayerObjById(id: string) {
    return this.clientsObj[id];
  }

  /**
   * takes in a client id and deletes that person's object from the array,
   * and removes controller representations.
   */
  removePlayer(clientId: string) {
    removeControllers(clientId);
    delete this.clientsObj[clientId];
  }

  /**
   * takes in an object with id, and pos data, and replaces the obj with the same id as that one in the array with this new one.
   * Also calls updateControllers in Controllers.js to update the corresponding graphical representation.
   */
  updatePos(receivedObj: User, clientId: string) {
    this.clientsObj[clientId] = receivedObj; // updates player obj in player list
    updateControllers(receivedObj, clientId); // updates controller representations
  }
}
