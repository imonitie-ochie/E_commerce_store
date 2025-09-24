const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const connectDB = require("./db_connection/mogo_db")
const UserRoute = require("./Routing/User_routing")
const CartRoute = require("./Routing/Cart_routing")
const PaymentRoute = require("./Routing/Payment_routing")
const cors = require("cors");


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "ExpressApp";

// Middleware
app.use(express.json());
connectDB()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-commerce-store-576s.vercel.app"  // ✅ add https
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.send(`Welcome to ${APP_NAME}!`);
});

app.use("/user", UserRoute)
app.use("/cart", CartRoute)
app.use("/transaction", PaymentRoute)

app.get("/api/env", (req, res) => {
  res.json({
    port: PORT,
    appName: APP_NAME,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ${APP_NAME} running on http://localhost:${PORT}`);
});
