import { Request, Response } from "express";
import About, { IAbout } from "../models/about";

// Create new About
export const createAbout = async (req: Request, res: Response): Promise<void> => {
  try {
    const about: IAbout = new About(req.body);
    const saved = await about.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all About entries
export const getAbout = async (_req: Request, res: Response): Promise<void> => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get About by ID
export const getAboutById = async (req: Request, res: Response): Promise<void> => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(about);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update About
export const updateAbout = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete About
export const deleteAbout = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await About.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json({ message: "About deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
