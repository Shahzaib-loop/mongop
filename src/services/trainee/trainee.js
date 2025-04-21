const db = require("../../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../../utils/auth')
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')

exports.logoutTrainee = async (email) => {
  return email
}

exports.getTraineeActivities = async (id) => {
  // return TraineeActivities.findAll({ where: { trainee_id: id }, })
}

exports.getAllTrainees = async () => {
  return Trainee.findAll()
}

exports.getAllTraineeByTrainerId = async (trainer_id) => {
  return Trainee.findAll({ where: { trainer_id, deleted: false, } })
}

exports.getTraineeById = async (id) => {
  return Trainee.findOne({ where: { id }, })
}

exports.createTrainee = async (data, t) => {
  return Trainee.create(data, { transaction: t })
}

exports.updateTrainee = async (id, data) => {
  return Trainee.update(data, { where: { id } })
}

exports.deleteTrainee = async (id) => {
  return Trainee.update({ deleted: true }, { where: { id } })
}

exports.restoreTrainee = async (id) => {
  return Trainee.update({ deleted: false }, { where: { id } })
}
