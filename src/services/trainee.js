const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const logger = require("../utils/logger")
const Trainee = db.sequelize.model('Trainee');

const generateTokens = (user) => {
  const { _id = '', role = 'trainee' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerTrainee = async ({ firstName = '', lastName = '', email = '', password = '' }) => {
  let user = await Trainee.findOne({ where: { email } });

  if (user) throw new Error("Trainee already exists")

  const hashedPassword = await bcrypt.hash(password, 10)

  user = await Trainee.create({ firstName, lastName, email, password: hashedPassword })

  logger.info({ message: "Trainee registered successfully", email })

  return generateTokens(user)
}

const loginTrainee = async ({ email, password }) => {
  const user = await Trainee.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)

  logger.info({ message: "Trainee logged in", email })

  return tokens
}

const logoutTrainee = async (email) => {
  const user = await Trainee.findOne({ email })
  if (!user) throw new Error("Invalid email or password")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const tokens = generateTokens(user)
  logger.info({ message: "Trainee logged in", email })

  return tokens
}

const getTrainees = async () => {
  try {
    return Trainee.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const getTrainee = async () => {
  try {
    return Trainee.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const updateTrainee = async () => {
  try {
    return Trainee.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

const deleteTrainee = async () => {
  try {
    return Trainee.findAll()
  }
  catch (err) {
    logger.error({ message: `Error fetching admins: ${ err }` })
  }
}

module.exports = {
  registerTrainee,
  loginTrainee,
  logoutTrainee,
  getTrainees,
  getTrainee,
  updateTrainee,
  deleteTrainee,
}