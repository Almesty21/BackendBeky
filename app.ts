import express from "express";
import cors from "cors";
import morgan from "morgan";
import {InitializorRoutes} from "./routes/InitializorRoutes";
const app = express();

// Allow all origins (for development only)
app.use(cors());

// Or specify allowed origins
/** **/
/* app.use(cors({
    origin: ['http://localhost:5173/'] 
}));
*/


// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", InitializorRoutes);

export default app;
