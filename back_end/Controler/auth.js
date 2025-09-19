import jwt from "jsonwebtoken";

const JWT_SECRET = "19c2bd9c";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user info to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
