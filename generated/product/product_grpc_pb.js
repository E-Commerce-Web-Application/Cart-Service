// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var product_product_pb = require('../product/product_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_app_generated_products_DeleteResponse(arg) {
  if (!(arg instanceof product_product_pb.DeleteResponse)) {
    throw new Error('Expected argument of type app.generated.products.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_DeleteResponse(buffer_arg) {
  return product_product_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductCreateRequest(arg) {
  if (!(arg instanceof product_product_pb.ProductCreateRequest)) {
    throw new Error('Expected argument of type app.generated.products.ProductCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductCreateRequest(buffer_arg) {
  return product_product_pb.ProductCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductIdRequest(arg) {
  if (!(arg instanceof product_product_pb.ProductIdRequest)) {
    throw new Error('Expected argument of type app.generated.products.ProductIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductIdRequest(buffer_arg) {
  return product_product_pb.ProductIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductListResponse(arg) {
  if (!(arg instanceof product_product_pb.ProductListResponse)) {
    throw new Error('Expected argument of type app.generated.products.ProductListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductListResponse(buffer_arg) {
  return product_product_pb.ProductListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductResponse(arg) {
  if (!(arg instanceof product_product_pb.ProductResponse)) {
    throw new Error('Expected argument of type app.generated.products.ProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductResponse(buffer_arg) {
  return product_product_pb.ProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductUpdateRequest(arg) {
  if (!(arg instanceof product_product_pb.ProductUpdateRequest)) {
    throw new Error('Expected argument of type app.generated.products.ProductUpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductUpdateRequest(buffer_arg) {
  return product_product_pb.ProductUpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_app_generated_products_ProductUpdateResponse(arg) {
  if (!(arg instanceof product_product_pb.ProductUpdateResponse)) {
    throw new Error('Expected argument of type app.generated.products.ProductUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_app_generated_products_ProductUpdateResponse(buffer_arg) {
  return product_product_pb.ProductUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductServiceService = exports.ProductServiceService = {
  createProduct: {
    path: '/app.generated.products.ProductService/CreateProduct',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.ProductCreateRequest,
    responseType: product_product_pb.ProductResponse,
    requestSerialize: serialize_app_generated_products_ProductCreateRequest,
    requestDeserialize: deserialize_app_generated_products_ProductCreateRequest,
    responseSerialize: serialize_app_generated_products_ProductResponse,
    responseDeserialize: deserialize_app_generated_products_ProductResponse,
  },
  getProduct: {
    path: '/app.generated.products.ProductService/GetProduct',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.ProductIdRequest,
    responseType: product_product_pb.ProductResponse,
    requestSerialize: serialize_app_generated_products_ProductIdRequest,
    requestDeserialize: deserialize_app_generated_products_ProductIdRequest,
    responseSerialize: serialize_app_generated_products_ProductResponse,
    responseDeserialize: deserialize_app_generated_products_ProductResponse,
  },
  getAllProducts: {
    path: '/app.generated.products.ProductService/GetAllProducts',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: product_product_pb.ProductListResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_app_generated_products_ProductListResponse,
    responseDeserialize: deserialize_app_generated_products_ProductListResponse,
  },
  updateProduct: {
    path: '/app.generated.products.ProductService/UpdateProduct',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.ProductUpdateRequest,
    responseType: product_product_pb.ProductUpdateResponse,
    requestSerialize: serialize_app_generated_products_ProductUpdateRequest,
    requestDeserialize: deserialize_app_generated_products_ProductUpdateRequest,
    responseSerialize: serialize_app_generated_products_ProductUpdateResponse,
    responseDeserialize: deserialize_app_generated_products_ProductUpdateResponse,
  },
  deleteProduct: {
    path: '/app.generated.products.ProductService/DeleteProduct',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.ProductIdRequest,
    responseType: product_product_pb.DeleteResponse,
    requestSerialize: serialize_app_generated_products_ProductIdRequest,
    requestDeserialize: deserialize_app_generated_products_ProductIdRequest,
    responseSerialize: serialize_app_generated_products_DeleteResponse,
    responseDeserialize: deserialize_app_generated_products_DeleteResponse,
  },
};

exports.ProductServiceClient = grpc.makeGenericClientConstructor(ProductServiceService, 'ProductService');
