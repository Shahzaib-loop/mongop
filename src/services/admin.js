const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const logger = require("../utils/logger")
const Admin = db.sequelize.model('Admin');

const generateTokens = (user) => {
  const { _id = '', role = 'admin' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerAdmin = async ({ firstName = '', lastName = '', email = '', password = '' }) => {
  let user = await Admin.findOne({ where: { email } });

  if (user) throw new Error("Admin already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  user = await Admin.create({ firstName, lastName, email, password: hashedPassword })

  logger.info({ message: "Admin registered successfully", email })

  return generateTokens(user)
}

const loginAdmin = async ({ email = '', password = '' }) => {
  const user = await Admin.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)

  logger.info({ message: "Admin logged in", email })

  return tokens
}

const logoutAdmin = async (email = '') => {
  const user = await Admin.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)
  logger.info({ message: "Admin logged in", email })

  return tokens
}

const getAdmins = async () => {
  try {
    return Admin.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const getAdmin = async () => {
  try {
    return Admin.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}
const updateAdmin = async () => {
  try {
    return Admin.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}
const deleteAdmin = async () => {
  try {
    return Admin.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}
