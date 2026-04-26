const Cart = require('../models/cartModel');

/**
 * GET /api/cart?user_id=123
 */
exports.getCart = async (req, res, next) => {
  try {
    const { user_id } = req.query; 

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    const cart = await Cart.findOne({ userId: user_id });

    if (!cart) {
      return res.json({ user_id, items: [], total_amount: 0 });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart/add
 * Body: { "user_id": "123", "item": { "product_id": "...", "quantity": 1, ... } }
 */
exports.addItem = async (req, res, next) => {
  try {
    const { user_id, item } = req.body;

    if (!user_id || !item || !item.product_id) {
      return res.status(400).json({ message: "Missing user_id or item details" });
    }

    let cart = await Cart.findOne({ userId: user_id });
    if (!cart) {
      cart = new Cart({ userId: user_id, items: [], totalAmount: 0 });
    }

    const existingItem = cart.items.find(i => i.productId === item.product_id);

    if (existingItem) {
      existingItem.quantity += (item.quantity || 1);
    } else {
      cart.items.push({
        productId: item.product_id,
        name: item.name || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || "",
        shopId: item.shop_id || ""
      });
    }

    cart.totalAmount = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/remove/:product_id?user_id=123
 */
exports.removeItem = async (req, res, next) => {
  try {
    const { product_id } = req.params; 
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id query parameter is required" });
    }

    let cart = await Cart.findOne({ userId: user_id });

    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== product_id);
      cart.totalAmount = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      await cart.save();
      res.json(cart);
    } else {
      res.json({ items: [], total_amount: 0 });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/cart/update/:product_id?user_id=123
 * Body: { quantity: number }
 */
exports.updateItemQuantity = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { user_id } = req.query;
    const { quantity } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "user_id query parameter is required" });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: "quantity must be an integer greater than 0" });
    }

    const cart = await Cart.findOne({ userId: user_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((entry) => entry.productId === product_id);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = quantity;
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/clear?user_id=123
 */
exports.clearCart = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id query parameter is required" });
    }

    await Cart.findOneAndDelete({ userId: user_id });

    res.json({ message: `Cart cleared successfully for user: ${user_id}` });
  } catch (error) {
    next(error);
  }
};