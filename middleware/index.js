const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || '3435304115fd55f5fb60377325d13d591c8cd49a';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract token if it has "Bearer " prefix
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({
            message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token"
        });
    }
};