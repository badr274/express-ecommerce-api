import { env } from "./env";
import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.dbUrl);

    console.log(`Database connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error}`);
    process.exit(1);
  }
};
