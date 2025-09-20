import express from "express";
import { googleLogin } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googleLogin);

export default authRouter;
 