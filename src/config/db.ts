import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbConstant } from "../constant/db.ts"
dotenv.config();


const { MONGO_URI_NOT_FOUND, MONGO_CONNECTED_SUCCESSFULLY, MONGO_CONNECTION_ERROR } = dbConstant;

const ConnectDB = async () => {
  try {
    const connect = process.env.MONGO_URI;
    if (!connect) {
      throw new Error(MONGO_URI_NOT_FOUND);
    }

    await mongoose.connect(connect);
    console.log(MONGO_CONNECTED_SUCCESSFULLY);
  } catch (error) {
    console.error(MONGO_CONNECTION_ERROR, error);
    process.exit(1);
  }
};

export default ConnectDB;
