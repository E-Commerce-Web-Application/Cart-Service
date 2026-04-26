const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// GET /api/cart?user_id=123
router.get("/", cartController.getCart);

// POST /api/cart/add
router.post("/add", cartController.addItem);

// DELETE /api/cart/remove/:product_id?user_id=123
router.delete("/remove/:product_id", cartController.removeItem);

// PATCH /api/cart/update/:product_id?user_id=123
router.patch("/update/:product_id", cartController.updateItemQuantity);

// DELETE /api/cart/clear?user_id=123
router.delete("/clear", cartController.clearCart);

module.exports = router;