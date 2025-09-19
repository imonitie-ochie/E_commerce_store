import cartModel from "../database_schema/cart.js";
import axios from "axios";

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // from JWT middleware

    // Find or create a cart for this user
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    // ✅ Use cart (not cartModel) here
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get cart with product details from Fake Store API
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) return res.json({ success: true, items: [] });

    // Fetch product details from Fake Store API
    const itemsWithDetails = await Promise.all(
      cart.items.map(async (item) => {
        const { data: productData } = await axios.get(
          `https://fakestoreapi.com/products/${item.product}`
        );

        return {
          productId: item.product,
          quantity: item.quantity,
          name: productData.title,
          price: productData.price,
          image: productData.image,
        };
      })
    );

    res.json({ success: true, items: itemsWithDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await cartModel.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
