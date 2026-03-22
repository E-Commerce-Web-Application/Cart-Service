const Cart = require("../Cart-Service/src/models/cartModel");
const cart_pb = require("../Cart-Service/generated/cart/cart_pb");

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

exports.getCart = async (call, callback) => {
  try {
    const userId = call.request.getUserId();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [], totalAmount: 0 });
    }

    const cartMessage = new cart_pb.Cart();
    cartMessage.setUserId(cart.userId);

    const items = cart.items.map((item) => {
      const cartItem = new cart_pb.CartItem();
      cartItem.setProductId(item.productId);
      cartItem.setName(item.name);
      cartItem.setPrice(item.price);
      cartItem.setQuantity(item.quantity);
      cartItem.setImage(item.image);
      cartItem.setShopId(item.shopId);
      return cartItem;
    });

    cartMessage.setItemsList(items);
    cartMessage.setTotalAmount(cart.totalAmount);

    const response = new cart_pb.CartResponse();
    response.setCart(cartMessage);

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

exports.addItem = async (call, callback) => {
  try {
    const userId = call.request.getUserId();
    const item = call.request.getItem();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existing = cart.items.find(
      (i) => i.productId === item.getProductId()
    );

    if (existing) {
      existing.quantity += item.getQuantity();
    } else {
      cart.items.push({
        productId: item.getProductId(),
        name: item.getName(),
        price: item.getPrice(),
        quantity: item.getQuantity(),
        image: item.getImage(),
        shopId: item.getShopId(),
      });
    }

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    const cartMessage = new cart_pb.Cart();
    cartMessage.setUserId(cart.userId);

    const items = cart.items.map((i) => {
      const cartItem = new cart_pb.CartItem();
      cartItem.setProductId(i.productId);
      cartItem.setName(i.name);
      cartItem.setPrice(i.price);
      cartItem.setQuantity(i.quantity);
      cartItem.setImage(i.image);
      cartItem.setShopId(i.shopId);
      return cartItem;
    });

    cartMessage.setItemsList(items);
    cartMessage.setTotalAmount(cart.totalAmount);

    const response = new cart_pb.CartResponse();
    response.setCart(cartMessage);

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

exports.removeItem = async (call, callback) => {
  try {
    const userId = call.request.getUserId();
    const productId = call.request.getProductId();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return callback(new Error("Cart not found"));
    }

    cart.items = cart.items.filter((i) => i.productId !== productId);

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    const cartMessage = new cart_pb.Cart();
    cartMessage.setUserId(cart.userId);

    const items = cart.items.map((i) => {
      const cartItem = new cart_pb.CartItem();
      cartItem.setProductId(i.productId);
      cartItem.setName(i.name);
      cartItem.setPrice(i.price);
      cartItem.setQuantity(i.quantity);
      cartItem.setImage(i.image);
      cartItem.setShopId(i.shopId);
      return cartItem;
    });

    cartMessage.setItemsList(items);
    cartMessage.setTotalAmount(cart.totalAmount);

    const response = new cart_pb.CartResponse();
    response.setCart(cartMessage);

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

exports.clearCart = async (call, callback) => {
  try {
    const userId = call.request.getUserId();

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      cart.totalAmount = 0;
      await cart.save();
    }

    const response = new cart_pb.ClearCartResponse();
    response.setMessage("Cart cleared successfully");

    callback(null, response);
  } catch (error) {
    callback(error);
  }
};