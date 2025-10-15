const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    amount: {
        
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("payment", paymentSchema);