import { connect } from "mongoose";
import config from "../config";

export const connectToDb = async () => {
  const uri = config.mongoUri || "";
  try {
    await connect(uri);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};
