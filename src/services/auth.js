const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const logger = require("../utils/logger");

// Generate Access & Refresh Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

// Admin Registration
const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  let user = await Admin.findOne({ email });
  if (user) {
    throw new Error("Admin already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  user = new Admin({ name, email, password: hashedPassword });

  // Save user to DB
  await user.save();
  logger.info({ message: "Admin registered successfully", email });

  return { message: "Admin registered successfully" };
};

// Admin Login
const loginUser = async ({ email, password }) => {
  // Check user existence
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const tokens = generateTokens(user);
  logger.info({ message: "Admin logged in", email });

  return tokens;
};

// Verify Refresh Token and Issue New Access Token
const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    return generateTokens({ id: decoded.id });
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

module.exports = { registerUser, loginUser, refreshTokenService };
