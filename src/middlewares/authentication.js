const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")

// Verify Access Token
const verifyToken  = (req, res, next) => {
  const token = req.header("Authorization")

  if (!token) {
    logger.warn({ message: "Unauthorized access attempt", method: req.method, url: req.originalUrl })
    return res.status(401).json({ error: "Access Denied: No token provided" })
  }

  try {
    const tokenValue = token.split(" ")[1] // Extract token after "Bearer"
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)

    req.user = decoded
    logger.info({ message: "User authenticated", method: req.method, url: req.originalUrl, userId: decoded.id })

    next()
  }
  catch (error) {
    logger.error({ message: "Invalid token", method: req.method, url: req.originalUrl, stack: error.stack })
    res.status(403).json({ error: "Invalid or expired token" })
  }
}
// ====================================================================================================================

// Generate New Tokens
const generateTokens = (user) => {
  const { id, role } = user
  const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: "30d" })

  return { accessToken, refreshToken }
}
// ====================================================================================================================

// Verify Refresh Token and Issue New Access Token
const refreshTokenMiddleware = (req, res) => {
  const { refreshToken } = req?.body

  if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" })

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const tokens = generateTokens({ id: decoded.id })

    logger.info({ message: "Access token refreshed", userId: decoded.id })

    res.json(tokens)
  }
  catch (error) {
    logger.error({ message: "Invalid refresh token", stack: error.stack })
    res.status(403).json({ error: "Invalid or expired refresh token" })
  }
}

module.exports = { verifyToken, generateTokens, refreshTokenMiddleware }