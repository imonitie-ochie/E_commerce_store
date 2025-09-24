const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    console.log("Request Headers:", req.headers);

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "TOKEN IS REQUIRED" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(403).json({ message: "INVALID TOKEN FORMAT" });
    }

    const token = tokenParts[1];
    console.log("Token:", token);

    // ✅ Use the correct secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(403).json({ message: "TOKEN HAS EXPIRED OR INVALID" });
      }

      console.log("Decoded Token:", user);
      req.user = user; // attach decoded token data (id, etc.)
      next();
    });
  } catch (error) {
    console.error("Middleware Error:", error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
