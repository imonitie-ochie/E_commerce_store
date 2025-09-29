// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const mongoose = require('mongoose');

exports.getWishlist = async (req, res) => {
  try {
    const wl = await Wishlist.findOne({ user: req.user._id }).populate('items.productId').lean();
    return res.json(wl?.items ?? []);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch wishlist', error: err.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ message: 'Invalid productId' });

    const wl = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { items: { productId } } },
      { upsert: true, new: true }
    );

    return res.status(201).json(wl.items);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to add to wishlist', error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { productId } } }
    );
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to remove', error: err.message });
  }
};
