const express = require("express");
const router = express.Router();
const { pay } = require("../Controler/payment.controller");
const {auth} = require("../middleware/auth");

// Payment route (protected with auth middleware)
router.post("/pay", auth, pay);

module.exports = router;
