const grpc = require('@grpc/grpc-js');
const { Timestamp } = require('google-protobuf/google/protobuf/timestamp_pb.js');

// Adjust paths based on your project structure
const messages = require('./app/generated/cart/cart_pb.js');
const Cart = require('./src/models/cartModel.js'); // Assuming you saved your schema here


function buildCartResponse(userId, cartDoc) {
  // If no cart document exists in DB, initialize empty defaults
  const cartData = cartDoc ?? { 
    items: [], 
    totalAmount: 0, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  };

  const pbCart = new messages.Cart();
  pbCart.setUserId(userId);
  pbCart.setTotalAmount(cartData.totalAmount);

  // Set CreatedAt Timestamp
  const createdAtTs = new Timestamp();
  createdAtTs.setSeconds(Math.floor(new Date(cartData.createdAt).getTime() / 1000));
  pbCart.setCreatedAt(createdAtTs);

  // Set UpdatedAt Timestamp
  const updatedAtTs = new Timestamp();
  const updatedTime = cartData.updatedAt ? new Date(cartData.updatedAt).getTime() : Date.now();
  updatedAtTs.setSeconds(Math.floor(updatedTime / 1000));
  pbCart.setUpdatedAt(updatedAtTs);

  // Map Mongoose items to Protobuf CartItem messages
  const pbItems = cartData.items.map(item => {
    const pbItem = new messages.CartItem();
    pbItem.setProductId(item.productId);
    pbItem.setName(item.name ?? "");
    pbItem.setPrice(item.price ?? 0);
    pbItem.setQuantity(item.quantity ?? 0);
    pbItem.setImage(item.image ?? "");
    pbItem.setShopId(item.shopId ?? "");
    return pbItem;
  });

  pbCart.setItemsList(pbItems);

  const response = new messages.CartResponse();
  response.setCart(pbCart);
  
  return response;
}

// --- GRPC METHOD HANDLERS ---

async function getCart(call, callback) {
  try {
    const userId = call.request.getUserId();
    const cartDoc = await Cart.findOne({ userId: { $eq: userId } });
    
    callback(null, buildCartResponse(userId, cartDoc));
  } catch (error) {
    console.error("Error in getCart:", error);
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

async function addItem(call, callback) {
  try {
    const userId = call.request.getUserId();
    const pbItem = call.request.getItem();
    const productId = pbItem.getProductId();

    // Find existing cart or create a new instance
    let cart = await Cart.findOne({ userId: { $eq: userId } });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find(i => i.productId === productId);

    if (existingItem) {
      existingItem.quantity += pbItem.getQuantity();
    } else {
      cart.items.push({
        productId: productId,
        name: pbItem.getName(),
        price: pbItem.getPrice(),
        quantity: pbItem.getQuantity(),
        image: pbItem.getImage(),
        shopId: pbItem.getShopId()
      });
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Save to MongoDB
    await cart.save();

    callback(null, buildCartResponse(userId, cart));
  } catch (error) {
    console.error("Error in addItem:", error);
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

async function removeItem(call, callback) {
  try {
    const userId = call.request.getUserId();
    const productId = call.request.getProductId();

    let cart = await Cart.findOne({ userId: { $eq: userId } });
    
    if (cart) {
      // Filter out the item
      cart.items = cart.items.filter(i => i.productId !== productId);
      
      // Recalculate total amount
      cart.totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      await cart.save();
    }

    callback(null, buildCartResponse(userId, cart));
  } catch (error) {
    console.error("Error in removeItem:", error);
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

async function clearCart(call, callback) {
  try {
    const userId = call.request.getUserId();
    
    await Cart.findOneAndDelete({ userId: { $eq: userId } });

    const response = new messages.ClearCartResponse();
    response.setMessage(`Cart cleared successfully for user: ${userId}`);
    
    callback(null, response);
  } catch (error) {
    console.error("Error in clearCart:", error);
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

module.exports = {
  getCart,
  addItem,
  removeItem,
  clearCart
};