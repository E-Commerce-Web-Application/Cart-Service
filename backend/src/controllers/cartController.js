const Cart = require("../models/cartModel");

/**
 * GET /api/cart
 */
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    return res.json({ items: [], totalAmount: 0 });
  }

  res.json(cart);
};

/**
 * POST /api/cart/add
 */
exports.addItem = async (req, res) => {
  const { productId, name, price, quantity, image, shopId } = req.body;

  if (!productId || !price || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({
      userId: req.user.id,
      items: []
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      name,
      price,
      quantity,
      image,
      shopId
    });
  }

  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};

/**
 * DELETE /api/cart/remove/:productId
 */
exports.removeItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.productId !== productId
  );

  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};

/**
 * DELETE /api/cart/clear
 */
exports.clearCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = [];
  cart.totalAmount = 0;

  await cart.save();

  res.json({ message: "Cart cleared" });
};