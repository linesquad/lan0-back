import { connect } from "mongoose";
import config from "../config";

export const connectToDb = async (
  retries: number = 2,
  delay: number = 5000
) => {
  const uri = config.mongoUri || "";
  const options = {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  };
  while (retries > 0) {
    try {
      await connect(uri, options);
      console.log("Connected to MongoDB");
      return;
    } catch (error) {
      retries -= 1;
      console.error(
        `Database connection failed. Retrying... (${retries} attempts left)`
      );
      if (retries === 0) {
        throw new Error("Database connection failed.");
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
