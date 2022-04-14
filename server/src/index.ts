import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import { Server } from "socket.io";

dotenv.config();

// Create an HTTPS service
const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_PATH!),
  cert: fs.readFileSync(process.env.CERT_PATH!),
};
const app = https.createServer(httpsOptions);

// Create a socket.io service
const ioOptions = {
  cors: {
    origin: "*",
  },
};
const io = new Server(app, ioOptions);

// Set up the socket.io listeners
io.on("connection", (socket) => {
  // When a user connects, broadcast the join event to all other users
  socket.broadcast.emit("join", socket.id);

  // When a user disconnects, broadcast the leave event to all other users
  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", socket.id);
  });

  // When a user sends a position update, broadcast the update event to all other users
  socket.on("update", (position) => {
    socket.broadcast.emit("update", position);
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
