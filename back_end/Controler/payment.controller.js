const Payment = require("../database_schema/payment");
const Cart = require("../database_schema/cart");
const axios = require("axios");

url = "https://api.paystack.co/transaction/initialize"


exports.pay = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);
        const { amount, email } = req.body;
        console.log("Request Body:", req.body);

        if (!amount || !email) {
            return res.status(400).json({ message: "Amount and email are required" });
        }
        const payment = new Payment({
            user: userId,
            amount,
            email
        });
        await payment.save();
        const data = {
            email,
            amount: amount * 100
        }
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.payStake}`,
                "Content-Type": "application/json"
            }
        };
        const response = await axios.post(url, data, config);
        console.log("Paystack Response:", response.data);
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        cart.items = [];
        await cart.save();
        res.status(201).json({
            message: "Payment Initialized Successfully",
            cart,
            data: response.data
        })

    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "Error Processing Payment" });
    }
}
