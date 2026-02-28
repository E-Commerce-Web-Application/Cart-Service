const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/add", cartController.addItem);
router.delete("/remove/:productId", cartController.removeItem);
router.delete("/clear", cartController.clearCart);

module.exports = router;