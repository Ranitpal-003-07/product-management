import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
        }

        // Verify JWT token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ success: false, message: "Session expired, please log in again" });
                }
                return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
            }

            // Ensure JWT payload contains correct user data
            req.user = {
                id: decoded.id || decoded.userId, // Check for both key names
                isAdmin: decoded.isAdmin || false, // Default to false if undefined
            };

            next();
        });
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
