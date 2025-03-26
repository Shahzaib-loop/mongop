const jwt = require('jsonwebtoken')

const generateTokens = (user) => {
  const { _id = '', role = '' } = user

  if (!(_id && role)) {
    return false
  }

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

module.exports = {
  generateTokens,
}