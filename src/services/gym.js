const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const logger = require("../utils/logger")
const { where } = require('sequelize');
const Gym = db.sequelize.model('Gym')

const generateTokens = (user) => {
  const { _id = '', role = 'gym' } = user

  const accessToken = jwt.sign({ id: _id, role }, process.env.JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ id: _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" })

  return { accessToken, refreshToken }
}

const registerGym = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let gym = await Gym.create({ ...data, password: hashedPassword })

  return gym
}

const loginGym = async ({ email, password }) => {
  const user = await Gym.findOne({ where: { email } })

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) return false

  const tokens = generateTokens(user)

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
  return Gym.findAll()
}

const getGym = async (id) => {
  return Gym.findOne({ where: { id } })
}

const updateGym = async (id, data) => {
  return Gym.update(data, { where: { id } })
}

const deleteGym = async (id) => {
  return Gym.update({ deleted: true }, { where: { id } })
}

const restoreGym = async (id) => {
  return Gym.update({ deleted: false }, { where: { id } })
}

module.exports = {
  registerGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
  restoreGym,
}