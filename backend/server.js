import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/dbConnection.js";
import userRouter from "./routes/user.routes.js";

// Create Express App and HTTP Server
const app = express();
const server = http.createServer(app);

// Middleware Setup
app.use(express.json());
app.use(cors());

// Routes  setup
app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);

// Connect to database
await connectDB();

// PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
