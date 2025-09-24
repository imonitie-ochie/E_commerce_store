// database_schema/cart.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  product: {
    id: Number,
    title: String,
    price: Number,
    image: String
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [itemSchema] 
}, { timestamps: true });

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart; 
