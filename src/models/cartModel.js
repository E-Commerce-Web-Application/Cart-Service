const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String,
  shopId: String
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    items: [itemSchema],
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);