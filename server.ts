import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import routes from "./routes"; // Ensure you have a routes file
import chalk from "chalk"; // Import chalk

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_DASHBOARD_URL,
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json

// Use your routes
app.use("/api", routes); // Adjust the route prefix as needed

// Connect to MongoDB
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  console.log(chalk.green(`✅ MongoDB connected successfully`)); // Colored message for MongoDB connection
  app.listen(PORT, () => {
    console.log(chalk.blue(`🚀 Server running on http://localhost:${PORT}`)); // Colored message for server port
  });
}).catch((error) => {
  console.error(chalk.red(`❌ Error connecting to MongoDB: ${error.message}`)); // Colored error message
});