import express from "express";
import {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController";

const router = express.Router();

router.post("/", createAbout);     // Create
router.get("/", getAbout);         // Read all
router.get("/:id", getAboutById);  // Read one
router.put("/:id", updateAbout);   // Update
router.delete("/:id", deleteAbout);// Delete

export { router as aboutRoute};
