// models/Wishlist.js
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: {
    id: Number,
    title: String,
    price: Number,
    image: String
  },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
