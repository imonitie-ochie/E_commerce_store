const Cart = require("../database_schema/cart");

// Add a product to cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { product } = req.body; 

  if (!product || !product.id) {
    return res.status(400).json({ message: "Product information is required" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.title === product.title
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ product, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get the cart for a user
exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({ message: "Cart does not exist", items: [], cartTotal: 0 });
    }

    // Calculate total price for each item
    const itemsWithTotal = cart.items.map(item => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity
    }));

    // Calculate total price of the entire cart
    const cartTotal = itemsWithTotal.reduce((sum, item) => sum + item.totalPrice, 0);

    res.status(200).json({
      message: "Cart fetched successfully",
      items: itemsWithTotal,
      cartTotal
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a specific item from cart
exports.deleteItem = async (req, res) => {
  const userId = req.user.id;
  const { producttitle } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.title === producttitle);
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ message: "Item removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear all items from cart
exports.clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.increaseQuantity = async (req, res) => {
  const userId = req.user.id;
  const { producttitle } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.title === producttitle);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
      await cart.save();
      return res.status(200).json({ message: "Item quantity increased", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error increasing item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.decreaseQuantity = async (req, res) => {
  const userId = req.user.id;
  const { producttitle } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.title === producttitle);
    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
      return res.status(200).json({ message: "Item quantity decreased", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// exports.totalPrice = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const cart = await Cart.findOne({ user: userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });
//     const cartTotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//     res.status(200).json({ cartTotal });
//   } catch (error) {
//     console.error("Error calculating total price:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }