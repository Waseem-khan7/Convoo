import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";

// Create Express App and HTTP Server
const app = express();
const server = http.createServer(app);

// Middleware Setup
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/status", (req, res) => res.send("Server is Live"));

// PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
