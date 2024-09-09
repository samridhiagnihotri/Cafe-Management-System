require('dotenv').config();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValid, loginValid } = require("../utils/errorHandler");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, cf_password } = req.body;
      console.log(req.body);

      // Validate registration data
      const errorMessage = registerValid(name, email, password, cf_password);
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      // Check if user already exists
      const userExists = await Users.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "This email is already in use" });
      }

      // Hash the password and save the user
      const hashedPassword = await bcrypt.hash(password, 12);
      await new Users({
        name,
        email,
        password: hashedPassword,
      }).save();

      // Respond with success message
      res.status(201).json({
        message: "You have successfully registered. Please login now",
      });
    } catch (error) {
      // Respond with error message
      console.error("Registration error:", error.message); // Log error for debugging
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate login data
      const errorMessage = loginValid(email, password);
      if (errorMessage) return res.status(400).json({ message: errorMessage });

      // Find the user
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create and return JWT token
      const token = jwt.sign(
        { _id: user._id, role: user.role }, // Include user role or any other claims if needed
        process.env.JWT_SECRET, // Use environment variable for the secret key
        { expiresIn: "7d" } // Token expires in 7 days
      );

      // Exclude password from user object
      user.password = undefined;

      res.status(200).json({
        message: "You have successfully logged in",
        user,
        token,
      });
    } catch (error) {
      // Respond with error message
      console.error("Login error:", error.message); // Log error for debugging
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },
};

module.exports = authController;
