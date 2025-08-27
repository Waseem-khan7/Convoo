import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", auth, updateProfile);
userRouter.get("/check", auth, checkAuth);

export default userRouter;
