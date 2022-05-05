import { io } from "socket.io-client";
import { createMyUserObj } from "./controllers";
import PlayerList from "./PlayerList";
import User from "./types/User";

const SERVER_URL = import.meta.env.VITE_BACKEND_URL || "https://localhost:8000";
const INTERVAL = 50;

var playerList = new PlayerList();

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("you connected with id: ", socket.id);

  // Prompt for username
  const username = prompt("Enter your username") || "Player";

  // Register user
  socket.emit("register", username);

  // constantly update send server new pos data
  window.setInterval(() => {
    socket.emit("update", createMyUserObj(socket.id, username), socket.id);
  }, INTERVAL);
});

// create player obj when a new client joins
socket.on("join", (socketId: string, username: string) => {
  playerList.createNewPlayer(socketId, username);
});

socket.on("update", (userObj: User, clientId: string) => {
  playerList.updatePos(userObj, clientId);
});

socket.on("leave", (clientId: string) => {
  playerList.removePlayer(clientId);
});
