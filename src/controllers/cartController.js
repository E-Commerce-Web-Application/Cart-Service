const Cart = require("../models/cartModel");

/**
 * GET /api/cart?userId=123
 */
exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart/add
 */
exports.addItem = async (req, res, next) => {
  try {
    const { userId, productId, name, price, quantity, image, shopId } = req.body;

    if (!userId || !productId || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
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
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/remove/:productId?userId=123
 */
exports.removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId });

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
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/clear?userId=123
 */
exports.clearCart = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};