const express = require("express");
const { WishListContoler } = require("../Controler/Cart_controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

// 📌 Get all wishlist items for a user
router.get("/", auth, WishListContoler.getAll);

// 📌 Add an item to wishlist
router.post("/add", auth, WishListContoler.addItem);

// 📌 Remove an item from wishlist
router.delete("/remove/:id", auth, WishListContoler.removeItem);



module.exports = router;
