const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Add a new comment
router.post("/add", commentController.addComment);

// Get all comments for a product by product name
router.get("/:productName", commentController.getCommentsByProduct);

module.exports = router;
