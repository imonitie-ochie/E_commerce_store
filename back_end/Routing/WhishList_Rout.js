const express = require("express");
const { auth } = require("../middleware/auth");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require("../Controler/WhisListControler");

const router = express.Router();

// 📌 Get all wishlist items for a user
router.get("/", auth, getWishlist);

// 📌 Add an item to wishlist
router.post("/add", auth, addToWishlist);

// 📌 Remove an item from wishlist
router.delete("/remove/:productId", auth, removeFromWishlist);

module.exports = router;
