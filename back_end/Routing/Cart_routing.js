const express = require("express");
const { addToCart, getCart, deleteItem ,increaseQuantity,decreaseQuantity ,clearCart } = require("../Controler/Cart_controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Add a product to the cart
router.post("/add", auth, addToCart);

// View user's cart
router.get("/view", auth, getCart);

// Delete a product from the cart by title
router.delete("/remove/:producttitle", auth, deleteItem);

router.put("/increase/:producttitle", auth, increaseQuantity);

router.put("/decrease/:producttitle", auth, decreaseQuantity);

router.delete("/clear", auth, clearCart);

// router.get("/total", auth, totalPrice);

module.exports = router;
