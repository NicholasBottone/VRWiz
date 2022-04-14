import dotenv from "dotenv";
import log4js from "log4js";
import fs from "fs";
import https from "https";
import { Server } from "socket.io";

// Load environment variables from .env file
dotenv.config();

// Load logger configuration
log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "logs/app.log" },
  },
  categories: {
    default: { appenders: ["out", "app"], level: "debug" },
  },
});
const logger = log4js.getLogger("server");

// Create an HTTPS service
const httpsOptions = {
  key: fs.readFileSync(process.env.KEY_PATH!),
  cert: fs.readFileSync(process.env.CERT_PATH!),
};
const app = https.createServer(httpsOptions);
logger.info("HTTPS server created");

// Create a socket.io service
const ioOptions = {
  cors: {
    origin: "*",
  },
};
const io = new Server(app, ioOptions);
logger.info("Socket.io server created");

// Set up the socket.io listeners
io.on("connection", (socket) => {
  logger.debug(`Client connected: ${socket.id}`);

  // When a user connects, broadcast the join event to all other users
  socket.broadcast.emit("join", socket.id);

  // When a user disconnects, broadcast the leave event to all other users
  socket.on("disconnect", () => {
    logger.debug(`Client disconnected: ${socket.id}`);
    socket.broadcast.emit("leave", socket.id);
  });

  // When a user sends an update, broadcast the update event to all other users
  socket.on("update", (update) => {
    logger.trace(`Client updated: ${socket.id}`);
    socket.broadcast.emit("update", update);
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
