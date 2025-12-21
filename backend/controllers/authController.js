import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ======================
// REGISTER
// ======================
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for duplicates in one query
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({
        error: existing.email === email ? "Email already used" : "Username already used"
      });
    }

    // Create user
    const user = await User.create({ username, email, password });

    // Optionally: generate verification token here
    const token = user.createVerificationToken();
    await user.save();

    // Return user (password hidden)
    return res.status(201).json({ user: user.getPublicProfile(), verificationToken: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error, user not created" });
  }
};

// ======================
// LOGIN
// ======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Check password using schema method
    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    // Optional: check banned
    if (user.isBanned) return res.status(403).json({ error: "Account banned" });

    // Optional: check email verification
    if (!user.isVerified) return res.status(403).json({ error: "Email not verified" });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, user: user.getPublicProfile() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error, cannot login" });
  }
};
