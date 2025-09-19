// Add to cart
const addToCart = (req, res) => {
  // your logic
  res.send("Item added to cart");
};

// Remove from cart
const removeFromCart = (req, res) => {
  // your logic
  res.send("Item removed from cart");
};

// View cart
const viewCart = (req, res) => {
  // your logic
  res.send("Here is your cart");
};

module.exports = { addToCart, removeFromCart, viewCart };