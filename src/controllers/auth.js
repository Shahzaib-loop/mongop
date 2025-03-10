const { registerUser, loginUser, refreshTokenService } = require("../services/auth");

// User Registration Controller
const register = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User Login Controller
const login = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Refresh Token Controller
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshTokenService(refreshToken);
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, refreshToken };
