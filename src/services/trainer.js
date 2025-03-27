const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Trainer = db.sequelize.model('Trainer');

const createTrainer = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let trainer = await Trainer.create({ ...data, password: hashedPassword })

  return trainer
}

const loginTrainer = async ({ email, password }) => {
  const trainer = await Trainer.findOne({ where: { email }, raw: true })

  if (!(Object.keys(trainer).length > 0)) return false

  const isMatch = await bcrypt.compare(password, trainer.password)

  if (!isMatch) return false

  const tokens = generateTokens(trainer)

  if (!(Object.keys(tokens).length > 0)) return false

  return { trainer, tokens }
}

const logoutTrainer = async (email) => {
  return email
}

const getTrainers = async () => {
  return Trainer.findAll()
}

const getTrainer = async (id) => {
  return Trainer.findOne({ where: { id } })
}

const updateTrainer = async (id, data) => {
  return Trainer.update(data, { where: { id } })
}

const deleteTrainer = async () => {
  return Trainer.update({ deleted: true }, { where: { id } })
}

const restoreTrainer = async () => {
  return Trainer.update({ deleted: false }, { where: { id } })
}

module.exports = {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,
}