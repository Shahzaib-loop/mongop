const { registerUser, loginUser, refreshTokenService } = require("../services/auth")

// User Registration Controller
const register = async (req, res) => {
  try {
    const response = await registerUser(req.body)
    res.status(201).json(response)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// User Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req?.body
    const { token, user } = await loginUser(email, password)

    res.json({ token, role: user.role, userId: user._id })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getProfile = async (req, res) => {
  res.json({ message: "Profile Data", user: req.user })
}


// Refresh Token Controller
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    const tokens = await refreshTokenService(refreshToken)
    res.json(tokens)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { register, login, refreshToken, getProfile, }
