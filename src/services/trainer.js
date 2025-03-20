const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const logger = require("../utils/logger")
const Trainer = db.sequelize.model('Trainer');

const generateTokens = (user) => {
  const { _id = '', role = 'trainer' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerTrainer = async ({ firstName = '', lastName = '', email = '', password = '' }) => {
  let user = await Trainer.findOne({ where: { email } });

  if (user) throw new Error("Trainer already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  user = await Trainer.create({ firstName, lastName, email, password: hashedPassword })

  logger.info({ message: "Trainer registered successfully", email })

  return generateTokens(user)
}

const loginTrainer = async ({ email, password }) => {
  const user = await Trainer.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)

  logger.info({ message: "Trainer logged in", email })

  return tokens
}

const logoutTrainer = async (email) => {
  const user = await Trainer.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)
  logger.info({ message: "Trainer logged in", email })

  return tokens
}

const getTrainers = async () => {
  try {
    return Trainer.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const getTrainer = async () => {
  try {
    return Trainer.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const updateTrainer = async () => {
  try {
    return Trainer.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const deleteTrainer = async () => {
  try {
    return Trainer.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

module.exports = {
  registerTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
}