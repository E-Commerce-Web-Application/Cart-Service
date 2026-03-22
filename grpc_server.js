const grpc = require("@grpc/grpc-js");

const cartService = require("../Cart-Service/generated/cart/cart_grpc_pb");
const cartHandler = require("./cartHandler");
require("dotenv").config();
const connectDB = require("../Cart-Service/src/config/db");

connectDB();

const server = new grpc.Server();

server.addService(cartService.CartServiceService, {
  // These keys must match the lowercase identifiers defined in the generated
  // service descriptor (`cart_grpc_pb.js`). Using the capitalized RPC names
  // causes gRPC to think the methods are unimplemented, leading to the
  // "method not implemented" error shown by the client.
  getCart: cartHandler.getCart,
  addItem: cartHandler.addItem,
  removeItem: cartHandler.removeItem,
  clearCart: cartHandler.clearCart,
});

const PORT = "50051";

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 Cart gRPC Server running on port ${PORT}`);
    server.start();
  }
);