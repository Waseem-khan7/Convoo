import express from "express";
import { getUsersForSidebar } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/get-users", protectRoute, getUsersForSidebar);

export default messageRouter;
