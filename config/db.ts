// src/config/db.ts
import mongoose from "mongoose";
import chalk from "chalk";
export const connectDB = async (): Promise<void> => {
  
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // Adjust the timeout as needed
  });
    console.log(chalk.green("✅ MongoDB connection established"));
  } catch (error: any) {
    console.error(chalk.red(`❌ MongoDB connection failed: ${error.message}`));
    process.exit(1);
  }
};
