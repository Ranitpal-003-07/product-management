import express from "express";
import Product from "../models/Product.js";
import { verifyToken } from "../middleware/userAuth.js"; 

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Authenticated users)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      user: req.user.id, // Associate product with logged-in user
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Owner/Admin)
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    // Ensure only the owner or admin can update
    if (product.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Owner/Admin)
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router; // ✅ Export using ES Module syntax
