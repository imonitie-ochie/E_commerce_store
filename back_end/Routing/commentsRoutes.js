const express = require("express");
const router = express.Router();
const {addComment ,GetCommentsByProduct} =  require('../Controler/commentController');



// Add a new comment
router.post("/add", addComment);

// Get all comments for a product by product name
router.get("/:productName", GetCommentsByProduct);

module.exports = router;
