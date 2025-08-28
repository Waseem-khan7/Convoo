import express from "express";
import {
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/get-users", protectRoute, getUsersForSidebar);
messageRouter.get("/get-messages", protectRoute, getMessages);

export default messageRouter;
