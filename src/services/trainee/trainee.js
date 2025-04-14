const db = require("../../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../../utils/auth')
const { where } = require('sequelize');
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')

const loginTrainee = async ({ email, password }) => {
  const trainee = await Trainee.findOne({ where: { email }, raw: true })

  if (!(Object.keys(trainee).length > 0)) return false

  const isMatch = await bcrypt.compare(password, trainee.password)

  if (!isMatch) return false

  const tokens = generateTokens(trainee)

  if (!(Object.keys(tokens).length > 0)) return false

  return { trainee, tokens }
}

const logoutTrainee = async (email) => {
  return email
}

const getTraineeActivities = async (id) => {
  // return TraineeActivities.findAll({ where: { trainee_id: id }, })
}

const getAllTrainees = async (trainer_id) => {
  return Trainee.findAll({ where: { trainer_id } })
}

const getTraineeById = async (id) => {
  return Trainee.findOne({
    where: { id },
    // include: {
    //   model: TraineeActivities,
    // }
  })
}

const createTrainee = async (data, t) => {
  return Trainee.create(data, { transaction: t })
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
  loginTrainee,
  logoutTrainee,
  getTraineeActivities,
  getAllTrainees,
  getTraineeById,
  createTrainee,
  updateTrainee,
  deleteTrainee,
  restoreTrainee,
}