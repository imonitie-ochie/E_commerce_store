const Wishlist = require("../database_schema/Whislist_shema"); // keep your schema path
const mongoose = require("mongoose");

// Add a product to wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { product } = req.body;

  if (!product || !product.id) {
    return res.status(400).json({ message: "Product information is required" });
  }

  try {
    let wl = await Wishlist.findOne({ user: userId });
    if (!wl) wl = new Wishlist({ user: userId, items: [] });

    const existingIndex = wl.items.findIndex(
      (item) => item.product.title === product.title
    );

    if (existingIndex > -1) {
      // already in wishlist — return the wishlist unchanged
      return res.status(200).json({ message: "Product already in wishlist", wishlist: wl });
    } else {
      wl.items.push({ product });
    }

    await wl.save();
    return res.status(201).json({ message: "Product added to wishlist", wishlist: wl });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get the wishlist for a user
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wl = await Wishlist.findOne({ user: userId }).lean();
    if (!wl) {
      return res.status(200).json({ message: "Wishlist does not exist", items: [] });
    }

    // return items as-is (each item contains product)
    res.status(200).json({
      message: "Wishlist fetched successfully",
      items: wl.items || []
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a specific item from wishlist by product title
exports.deleteItem = async (req, res) => {
  const userId = req.user.id;
  const { producttitle } = req.params;

  try {
    const wl = await Wishlist.findOne({ user: userId });
    if (!wl) return res.status(404).json({ message: "Wishlist not found" });

    const itemIndex = wl.items.findIndex(item => item.product.title === producttitle);
    if (itemIndex > -1) {
      wl.items.splice(itemIndex, 1);
      await wl.save();
      return res.status(200).json({ message: "Item removed from wishlist", wishlist: wl });
    } else {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }
  } catch (error) {
    console.error("Error deleting item from wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Clear all items from wishlist
exports.clearWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wl = await Wishlist.findOne({ user: userId });
    if (!wl) return res.status(404).json({ message: "Wishlist not found" });

    wl.items = [];
    await wl.save();
    return res.status(200).json({ message: "Wishlist cleared successfully", wishlist: wl });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
