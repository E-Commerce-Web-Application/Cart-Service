// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var shop_shop_pb = require('../shop/shop_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');

function serialize_app_generated_shop_Shop(arg) {
  if (!(arg instanceof shop_shop_pb.Shop)) {
    throw new Error('Expected argument of type app.generated.shop.Shop');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_Shop(buffer_arg) {
  return shop_shop_pb.Shop.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_shop_ShopCreate(arg) {
  if (!(arg instanceof shop_shop_pb.ShopCreate)) {
    throw new Error('Expected argument of type app.generated.shop.ShopCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_ShopCreate(buffer_arg) {
  return shop_shop_pb.ShopCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_shop_ShopID(arg) {
  if (!(arg instanceof shop_shop_pb.ShopID)) {
    throw new Error('Expected argument of type app.generated.shop.ShopID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_ShopID(buffer_arg) {
  return shop_shop_pb.ShopID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_shop_ShopUpdate(arg) {
  if (!(arg instanceof shop_shop_pb.ShopUpdate)) {
    throw new Error('Expected argument of type app.generated.shop.ShopUpdate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_ShopUpdate(buffer_arg) {
  return shop_shop_pb.ShopUpdate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_shop_Shops(arg) {
  if (!(arg instanceof shop_shop_pb.Shops)) {
    throw new Error('Expected argument of type app.generated.shop.Shops');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_Shops(buffer_arg) {
  return shop_shop_pb.Shops.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_shop_VoidNoParam(arg) {
  if (!(arg instanceof shop_shop_pb.VoidNoParam)) {
    throw new Error('Expected argument of type app.generated.shop.VoidNoParam');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_shop_VoidNoParam(buffer_arg) {
  return shop_shop_pb.VoidNoParam.deserializeBinary(new Uint8Array(buffer_arg));
}


var ShopServiceService = exports.ShopServiceService = {
  createShop: {
    path: '/app.generated.shop.ShopService/CreateShop',
    requestStream: false,
    responseStream: false,
    requestType: shop_shop_pb.ShopCreate,
    responseType: shop_shop_pb.Shop,
    requestSerialize: serialize_app_generated_shop_ShopCreate,
    requestDeserialize: deserialize_app_generated_shop_ShopCreate,
    responseSerialize: serialize_app_generated_shop_Shop,
    responseDeserialize: deserialize_app_generated_shop_Shop,
  },
  getShop: {
    path: '/app.generated.shop.ShopService/GetShop',
    requestStream: false,
    responseStream: false,
    requestType: shop_shop_pb.ShopID,
    responseType: shop_shop_pb.Shop,
    requestSerialize: serialize_app_generated_shop_ShopID,
    requestDeserialize: deserialize_app_generated_shop_ShopID,
    responseSerialize: serialize_app_generated_shop_Shop,
    responseDeserialize: deserialize_app_generated_shop_Shop,
  },
  getAllShops: {
    path: '/app.generated.shop.ShopService/GetAllShops',
    requestStream: false,
    responseStream: false,
    requestType: shop_shop_pb.VoidNoParam,
    responseType: shop_shop_pb.Shops,
    requestSerialize: serialize_app_generated_shop_VoidNoParam,
    requestDeserialize: deserialize_app_generated_shop_VoidNoParam,
    responseSerialize: serialize_app_generated_shop_Shops,
    responseDeserialize: deserialize_app_generated_shop_Shops,
  },
  updateShop: {
    path: '/app.generated.shop.ShopService/UpdateShop',
    requestStream: false,
    responseStream: false,
    requestType: shop_shop_pb.ShopUpdate,
    responseType: shop_shop_pb.Shop,
    requestSerialize: serialize_app_generated_shop_ShopUpdate,
    requestDeserialize: deserialize_app_generated_shop_ShopUpdate,
    responseSerialize: serialize_app_generated_shop_Shop,
    responseDeserialize: deserialize_app_generated_shop_Shop,
  },
  deleteShop: {
    path: '/app.generated.shop.ShopService/DeleteShop',
    requestStream: false,
    responseStream: false,
    requestType: shop_shop_pb.ShopID,
    responseType: shop_shop_pb.VoidNoParam,
    requestSerialize: serialize_app_generated_shop_ShopID,
    requestDeserialize: deserialize_app_generated_shop_ShopID,
    responseSerialize: serialize_app_generated_shop_VoidNoParam,
    responseDeserialize: deserialize_app_generated_shop_VoidNoParam,
  },
};

exports.ShopServiceClient = grpc.makeGenericClientConstructor(ShopServiceService, 'ShopService');
