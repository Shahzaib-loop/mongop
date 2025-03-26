const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Gym = db.sequelize.model('Gym')

const createGym = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let gym = await Gym.create({ ...data, password: hashedPassword })

  return gym
}

const loginGym = async ({ email, password }) => {
  const gym = await Gym.findOne({ where: { email } })

  if (!gym) return false

  const isMatch = await bcrypt.compare(password, gym.password)

  if (!isMatch) return false

  const tokens = generateTokens(gym)

  if (!tokens) return false

  return { gym, tokens }
}

const logoutGym = async (email) => {
  return email
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
  createGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
  restoreGym,
}