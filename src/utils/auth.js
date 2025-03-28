const jwt = require('jsonwebtoken')
const responseHandler = require('./responseHandler')

const generateTokens = (user) => {
  const { id = '', role = '' } = user

  if (!(id && role)) {
    return false
  }

  const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

function checkAuthentication() {
  return (req, res, next) => {
    return next()
    if (req.url === '/healthcheck') return next()

    const token = req.headers.authorization?.split(' ')[1] // Get token from Bearer header

    if (!token) {
      return responseHandler.unauthorized(res, "No token provided", "authorization token is missing")
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (error) {
      return responseHandler.unauthorized(res, "Invalid token", "token is invalid or expired")
    }
  }
}

module.exports = {
  generateTokens,
  checkAuthentication,
}