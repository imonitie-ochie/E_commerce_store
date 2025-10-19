const express = require("express");
const router = express.Router();
const { addComment, getCommentsByProduct } = require("../Controler/commentController");
const {auth} = require("../middleware/auth")


router.post("/add", addComment);


router.get("/:productID", getCommentsByProduct);

module.exports = router;
