const Cart = require("./src/models/cartModel");
const cartPb = require("./app/generated/cart/cart_pb");
const { Timestamp } = require("google-protobuf/google/protobuf/timestamp_pb.js");

function toProtoTimestamp(date) {
  if (!date) return undefined;

  const timestamp = new Timestamp();
  const millis = new Date(date).getTime();

  timestamp.setSeconds(Math.floor(millis / 1000));
  timestamp.setNanos((millis % 1000) * 1e6);

  return timestamp;
}

function buildCartItem(itemDoc) {
  const item = new cartPb.CartItem();
  item.setProductId(itemDoc.productId || "");
  item.setName(itemDoc.name || "");
  item.setPrice(itemDoc.price || 0);
  item.setQuantity(itemDoc.quantity || 0);
  item.setImage(itemDoc.image || "");
  item.setShopId(itemDoc.shopId || "");
  return item;
}

function buildCartResponse(cartDoc) {
  const cartMessage = new cartPb.Cart();

  cartMessage.setUserId(cartDoc.userId || "");
  cartMessage.setItemsList((cartDoc.items || []).map(buildCartItem));
  cartMessage.setTotalAmount(cartDoc.totalAmount || 0);

  const createdAt = toProtoTimestamp(cartDoc.createdAt);
  const updatedAt = toProtoTimestamp(cartDoc.updatedAt);

  if (createdAt) cartMessage.setCreatedAt(createdAt);
  if (updatedAt) cartMessage.setUpdatedAt(updatedAt);

  const response = new cartPb.CartResponse();
  response.setCart(cartMessage);

  return response;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

exports.getCart = async (call, callback) => {
  try {
    const userId = call.request.getUserId();

    if (!userId) {
      return callback({
        code: 3, // INVALID_ARGUMENT
        message: "userId is required",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        totalAmount: 0,
      });
    }

    return callback(null, buildCartResponse(cart));
  } catch (error) {
    console.error("getCart error:", error);
    return callback({
      code: 13, // INTERNAL
      message: error.message || "Failed to get cart",
    });
  }
};

exports.addItem = async (call, callback) => {
  try {
    const userId = call.request.getUserId();
    const productId = call.request.getProductId();
    const name = call.request.getName();
    const price = call.request.getPrice();
    const quantity = call.request.getQuantity();
    const image = call.request.getImage();
    const shopId = call.request.getShopId();

    if (!userId || !productId || !price || !quantity) {
      return callback({
        code: 3, // INVALID_ARGUMENT
        message: "userId, productId, price and quantity are required",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (name) existingItem.name = name;
      if (image) existingItem.image = image;
      if (shopId) existingItem.shopId = shopId;
      if (price) existingItem.price = price;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        quantity,
        image,
        shopId,
      });
    }

    cart.totalAmount = calculateTotal(cart.items);
    await cart.save();

    return callback(null, buildCartResponse(cart));
  } catch (error) {
    console.error("addItem error:", error);
    return callback({
      code: 13, // INTERNAL
      message: error.message || "Failed to add item to cart",
    });
  }
};

exports.removeItem = async (call, callback) => {
  try {
    const userId = call.request.getUserId();
    const productId = call.request.getProductId();

    if (!userId || !productId) {
      return callback({
        code: 3, // INVALID_ARGUMENT
        message: "userId and productId are required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return callback({
        code: 5, // NOT_FOUND
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    return callback(null, buildCartResponse(cart));
  } catch (error) {
    console.error("removeItem error:", error);
    return callback({
      code: 13, // INTERNAL
      message: error.message || "Failed to remove item from cart",
    });
  }
};

exports.clearCart = async (call, callback) => {
  try {
    const userId = call.request.getUserId();

    if (!userId) {
      return callback({
        code: 3, // INVALID_ARGUMENT
        message: "userId is required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return callback({
        code: 5, // NOT_FOUND
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    const response = new cartPb.ClearCartResponse();
    response.setMessage("Cart cleared successfully");

    return callback(null, response);
  } catch (error) {
    console.error("clearCart error:", error);
    return callback({
      code: 13, // INTERNAL
      message: error.message || "Failed to clear cart",
    });
  }
};