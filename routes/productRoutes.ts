import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Routes
router.post("/", createProduct);          // Create a new product
router.get("/", getProducts);            // Get all products
router.get("/:id", getProductById);      // Get a single product by ID
router.put("/:id", updateProduct);       // Update a product by ID
router.delete("/:id", deleteProduct);    // Delete a product by ID

export {router as productRoutes};
