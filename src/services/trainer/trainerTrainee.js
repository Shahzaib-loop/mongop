const db = require("../../models")
const Trainer = db.sequelize.model('trainers')
const Trainee = db.sequelize.model('trainees')

// =======>>> Trainer handling Trainee
const getTrainerTrainee = async () => {

}

const createTrainerTrainee = async (data) => {
  console.log(data, "dataaaaaaaaaaaaaa")
  return Trainee.create(data)
}

const updateTrainerTrainee = async (id, data) => {

}

const deleteTrainerTrainee = async (id) => {

}

module.exports = {
  getTrainerTrainee,
  createTrainerTrainee,
  updateTrainerTrainee,
  deleteTrainerTrainee,
}