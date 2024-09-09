const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //Retrieves the Authorization header,conssisting of JWTtoken

  // Check if the Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await Users.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check user role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // Attach user info to request
    req.user = user;
    next();
  } catch (error) {
    // Handle errors (e.g., token invalid, expired)
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: "Invalid Authentication." });
  }
};

module.exports = adminAuthMiddleware;
