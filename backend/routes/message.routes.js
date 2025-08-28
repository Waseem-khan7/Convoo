import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/:id", protectRoute, sendMessage);

export default messageRouter;
