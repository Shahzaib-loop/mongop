const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Trainer = db.sequelize.model('Trainer')
const TrainerActivities = db.sequelize.model('TrainerActivities')

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

const getTrainerActivities = async (id) => {
  return TrainerActivities.findAll({ where: { trainerId: id }, })
}

const getTrainers = async () => {
  return Trainer.findAll()
}

const getTrainer = async (id) => {
  return Trainer.findOne({
    where: { id },
    include: {
      model: TrainerActivities,
    }
  })
}

const createTrainer = async (data, t) => {
  const tempPassword = 'tester'

  const hashedPassword = await bcrypt.hash(data?.password ? data.password : tempPassword, 10)

  let trainer = await Trainer.create({ ...data, password: hashedPassword }, { transaction: t })

  return trainer
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

const getTraineeWorkout = async () => {

}

const createTraineeWorkout = async () => {

}

const updateTraineeWorkout = async () => {

}

const deleteTraineeWorkout = async () => {

}

const getTrainerNote = async () => {

}

const createTrainerNote = async () => {

}

const updateTrainerNote = async () => {

}

const deleteTrainerNote = async () => {

}

module.exports = {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  getTrainerActivities,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,

  getTraineeWorkout,
  createTraineeWorkout,
  updateTraineeWorkout,
  deleteTraineeWorkout,

  getTrainerNote,
  createTrainerNote,
  updateTrainerNote,
  deleteTrainerNote,
}