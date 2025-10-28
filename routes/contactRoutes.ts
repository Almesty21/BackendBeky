import express from "express";
import * as contactController from "../controllers/contactController";

const router = express.Router();

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContactById);
router.post("/", contactController.createContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

export {router as contactRoutes};
