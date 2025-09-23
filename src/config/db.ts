import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {
  try {
    const connect = process.env.MONGO_URI;
    if (!connect) {
      throw new Error("MongoURI Not Found");
    }

    await mongoose.connect(connect);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default ConnectDB;
