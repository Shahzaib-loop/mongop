const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const logger = require("../utils/logger")
const Gym = db.sequelize.model('Gym');

const generateTokens = (user) => {
  const { _id = '', role = 'gym' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerGym = async ({ firstName = '', lastName = '', email = '', password = '' }) => {
  let user = await Gym.findOne({ where: { email } });

  if (user) throw new Error("Gym already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  user = await Gym.create({ firstName, lastName, email, password: hashedPassword })

  logger.info({ message: "Gym registered successfully", email })

  return generateTokens(user)
}

const loginGym = async ({ email, password }) => {
  const user = await Gym.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)

  logger.info({ message: "Gym logged in", email })

  return tokens
}

const logoutGym = async (email) => {
  const user = await Gym.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)
  logger.info({ message: "Gym logged in", email })

  return tokens
}

const getGyms = async () => {
  try {
    return Gym.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const getGym = async () => {
  try {
    return Gym.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const updateGym = async () => {
  try {
    return Gym.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const deleteGym = async () => {
  try {
    return Gym.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

module.exports = {
  registerGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
}