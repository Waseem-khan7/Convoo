import mongoose from "mongoose";
import "dotenv/config";

// Function to connect to the MongoDB Database
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("DataBase Connection Failed:", error);
  }
};
