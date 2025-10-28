import mongoose from "mongoose";
import cors from "cors";
import app from "./app";
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_DASHBOARD_URL
];

const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/database";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
/** Your routes go here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
**/