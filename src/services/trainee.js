const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Trainee = db.sequelize.model('Trainee')
const TraineeActivities = db.sequelize.model('TraineeActivities')

const createTrainee = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let trainee = await Trainee.create({ ...data, password: hashedPassword })

  return trainee
}

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

const getTrainees = async () => {
  return Trainee.findAll()
}

const getTrainee = async (id) => {
  return Trainee.findOne({
    where: { id },
    include: {
      model: TraineeActivities,
    }
  })
}

const getTraineeActivities = async (id) => {
  return TraineeActivities.findAll({ where: { traineeId: id }, })
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
  getTraineeActivities,
  updateTrainee,
  deleteTrainee,
  restoreTrainee,
}