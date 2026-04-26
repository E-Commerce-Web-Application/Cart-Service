const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { 
  validateUserIdQuery, 
  validateProductIdParam,
  handleValidationErrors 
} = require("../middleware/validationMiddleware");

// GET /api/cart?user_id=123
router.get("/", validateUserIdQuery, handleValidationErrors, cartController.getCart);

// POST /api/cart/add
router.post("/add", cartController.addItem);

// DELETE /api/cart/remove/:product_id?user_id=123
router.delete("/remove/:product_id", validateProductIdParam, validateUserIdQuery, handleValidationErrors, cartController.removeItem);

// PATCH /api/cart/update/:product_id?user_id=123
router.patch("/update/:product_id", validateProductIdParam, validateUserIdQuery, handleValidationErrors, cartController.updateItemQuantity);

// DELETE /api/cart/clear?user_id=123
router.delete("/clear", validateUserIdQuery, handleValidationErrors, cartController.clearCart);

module.exports = router;