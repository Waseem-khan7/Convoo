import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};
