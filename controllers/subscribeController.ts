import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Subscription from "../models/subscribe";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mihretabgirma21@gmail.com",
    pass: "lglixdxpwdrdfgaj", // ⚠️ Move to ENV variable in production!
  },
});

// @desc Subscribe user & send confirmation email
export const sendEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Save subscription to MongoDB
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    // Send confirmation email
    await transporter.sendMail({
      from: "mihretabgirma21@gmail.com",
      to: email,
      subject: "Subscription Confirmation",
      text: `Thank you for subscribing!`,
    });

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Subscription failed:", error);
    res.status(500).json({ message: "Subscription failed." });
  }
};

// @desc Get all subscriptions
export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find({}, "email -_id"); // only emails
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Error fetching subscriptions." });
  }
};
