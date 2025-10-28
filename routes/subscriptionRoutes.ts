import express from "express";
import { sendEmail, getAllSubscriptions } from "../controllers/subscribeController";

const router = express.Router();

router.post("/subscribe", sendEmail);   // POST -> subscribe
router.get("/subscriptions", getAllSubscriptions);  // GET -> list all

export {router as subscriptionRoutes} ;
