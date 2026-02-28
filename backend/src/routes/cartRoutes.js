const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addItem);
router.delete("/remove/:productId", auth, cartController.removeItem);
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;