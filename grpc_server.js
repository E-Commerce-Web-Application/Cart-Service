require("dotenv").config();
const grpc = require('@grpc/grpc-js');
const services = require('./app/generated/cart/cart_grpc_pb.js'); // The file you provided
const handlers = require('./cartHandler.js');

const server = new grpc.Server();
server.addService(services.CartServiceService, handlers);

server.bindAsync(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC Cart Server running on port ${process.env.GRPC_PORT}`);
});