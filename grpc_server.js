const grpc = require("@grpc/grpc-js");

const cartService = require("./generated/cart/cart_grpc_pb");
const cartHandler = require("./cartHandler");

const server = new grpc.Server();

server.addService(cartService.CartServiceService, {
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
    console.log(`Cart gRPC Server running on port ${PORT}`);
  }
);