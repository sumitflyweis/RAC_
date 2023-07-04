const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController")
const { verifyToken } = require("../middlewares/authJwt");

// Create a new product
router.post("/", verifyToken,productController.createProduct);


router.get("/", productController.getAllProduct);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Update a product
router.put("/:id", productController.updateProduct);

router.put("/addProductReview/:id", productController.addProductReview);

// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
