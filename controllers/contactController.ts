import { Request, Response } from "express";
import * as contactService from "../services/contactService";

// @desc    Get all contact messages
export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await contactService.getContacts();
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get contact by ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await contactService.createContact({
      name,
      email,
      subject,
      message,
    });
    res.status(201).json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact
export const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json({
      msg: "Contact removed",
      error: false,
      success: true,
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
