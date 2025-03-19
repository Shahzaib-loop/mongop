const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const logger = require("../utils/logger")
const db = require("../models")
const Admin = db.sequelize.model('Admin');

const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided")
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    return generateTokens({ id: decoded.id })
  }
  catch (error) {
    throw new Error("Invalid or expired refresh token")
  }
}

const generateTokens = (user) => {
  const { _id = '', role = 'admin' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerUser = async ({ firstName = '', lastName = '', email = '', password = '' }) => {
  let user = await Admin.findOne({ where: { email } });

  if (user) throw new Error("Admin already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  user = await Admin.create({ firstName, lastName, email, password: hashedPassword })

  logger.info({ message: "Admin registered successfully", email })

  return generateTokens(user)
}

const loginUser = async ({ email, password }) => {
  const user = await Admin.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)

  logger.info({ message: "Admin logged in", email })

  return tokens
}

const logoutUser = async (email) => {
  const user = await Admin.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)
  logger.info({ message: "Admin logged in", email })

  return tokens
}

const adminsData = async () => {
  try {
    return Admin.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}


module.exports = { refreshTokenService, registerUser, loginUser, logoutUser, adminsData, }
