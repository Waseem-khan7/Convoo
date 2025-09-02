import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/dbConnection.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = [
  process.env.FRONTEND_URL || "http://localhost:5173", // production from env or fallback
  "http://localhost:5173", // local dev
];
// CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Initilize Socket.io Server
export const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL, // restrict to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store online users
export const userSocketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("User Connected with ID:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online user to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware Setup
app.use(express.json({ limit: "5mb" }));

// Routes  setup
app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to database
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
