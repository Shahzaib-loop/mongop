const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Trainee = db.sequelize.model('Trainee');

const createTrainee = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let trainee = await Trainee.create({ ...data, password: hashedPassword })

  return trainee
}

const loginTrainee = async ({ email, password }) => {
  const user = await Trainee.findOne({ where: { email } })

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) return false

  const tokens = generateTokens(user)

  return tokens
}

const logoutTrainee = async (email) => {
  return email
}

const getTrainees = async () => {
  return Trainee.findAll()
}

const getTrainee = async (id) => {
  return Trainee.findOne({ where: { id } })
}

const updateTrainee = async (id, data) => {
  return Trainee.update(data, { where: { id } })
}

const deleteTrainee = async (id) => {
  return Trainee.update({ deleted: true }, { where: { id } })
}

const restoreTrainee = async (id) => {
  return Trainee.update({ deleted: false }, { where: { id } })
}

module.exports = {
  createTrainee,
  loginTrainee,
  logoutTrainee,
  getTrainees,
  getTrainee,
  updateTrainee,
  deleteTrainee,
  restoreTrainee,
}