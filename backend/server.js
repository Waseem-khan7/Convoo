import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/dbConnection.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { Server } from "socket.io";

// Create Express App and HTTP Server
const app = express();
const server = http.createServer(app);

// Initilize Socket.io Server
export const io = new Server(server, { cors: { origin: "*" } });

// Store online users
export const userScoketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("User Connected with ID:", userId);

  if (userId) userScoketMap[userId] = socket.id;

  // Emit online user to all connected clients
  io.emit("getOnlineUsers", Object.keys(userScoketMap));

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", userId);
    delete userScoketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userScoketMap));
  });
});

// Middleware Setup
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// Routes  setup
app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to database
await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () =>
    console.log(`Server is running on: http://localhost:${PORT}`)
  );
}

// Export server fro vercel
export default server;
