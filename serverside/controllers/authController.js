import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received for:", email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Incorrect password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Generated Token:", token); 

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:24* 60 * 60 * 1000, 
    });

    console.log("Login successful for:", email);
    
    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      token, 
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const checkAuthStatus = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); 

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Auth check error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
