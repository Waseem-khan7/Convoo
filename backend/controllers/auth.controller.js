import admin from "../lib/firebaseAdmin.js";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(idToken);

    const { email, name, picture, uid } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        password: uid,
        profilePic: picture || "",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log("Google Login error", error);
    res.status(500).json({ success: false, message: "Google Login Failed" });
  }
};
