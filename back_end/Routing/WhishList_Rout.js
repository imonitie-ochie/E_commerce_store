const express = require("express");
const { auth } = require("../middleware/auth");

const {
  addToWishlist,
  getWishlist,
  deleteItem,
  clearWishlist
} = require("../Controler/WhisListControler");

const router = express.Router();

// 📌 Get all wishlist items for a user
router.get("/get_users_items", auth, getWishlist);

// 📌 Add an item to wishlist
router.post("/add", auth, addToWishlist);

// 📌 Remove an item from wishlist
router.delete("/remove/:productId", auth, deleteItem);

router.delete("/deleteAllItems",auth,clearWishlist)

module.exports = router;
