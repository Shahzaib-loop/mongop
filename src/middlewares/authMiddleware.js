const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")

  if (!token) {
    logger.warn({ message: "Unauthorized access attempt", method: req.method, url: req.originalUrl })

    return res.status(401).json({ error: "Access Denied: No token provided" })
  }

  try {
    const tokenValue = token.split(" ")[1]
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)

    req.user = decoded
    logger.info({ message: "User authenticated", method: req.method, url: req.originalUrl, userId: decoded.id })

    next()
  }
  catch (error) {
    logger.error({ message: "Invalid token", method: req.method, url: req.originalUrl, stack: error.stack })

    res.status(403).json({ error: "Invalid token" })
  }
}

module.exports = authMiddleware