import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { InitializorRoutes } from "./routes/InitializorRoutes";

dotenv.config(); // Load .env variables

const app = express();

// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_DASHBOARD_URL,
];

// CORS configuration
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", InitializorRoutes);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    console.log(chalk.green("✅ MongoDB connected successfully"));
    app.listen(PORT, () => {
      console.log(chalk.blue(`🚀 Server running on http://localhost:${PORT}`));
    });
  })
  .catch((error: any) => {
    console.error(chalk.red(`❌ Error connecting to MongoDB: ${error.message}`));
  });
