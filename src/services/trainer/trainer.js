const db = require("../../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../../utils/auth')
const Trainer = db.sequelize.model('trainers')
const Trainee = db.sequelize.model('trainees')
// const TrainerActivities = db.sequelize.model('trainer_activities')

exports.loginTrainer = async ({ email, password }) => {
  const trainer = await Trainer.findOne({ where: { email }, raw: true })

  if (!(Object.keys(trainer).length > 0)) return false

  const isMatch = await bcrypt.compare(password, trainer.password)

  if (!isMatch) return false

  const tokens = generateTokens(trainer)

  if (!(Object.keys(tokens).length > 0)) return false

  return { trainer, tokens }
}

exports.logoutTrainer = async (email) => {
  return email
}

exports.getTrainerActivities = async (id) => {
  // return TrainerActivities.findAll({ where: { trainer_id: id }, })
}

exports.getAllTrainers = async () => {
  return Trainer.findAll({ where: { deleted: false } })
}

exports.getTrainerById = async (id) => {
  return Trainer.findOne({
    where: { id, deleted: false, },
    include: [
      // {
      //   model: TrainerActivities,
      // },
      {
        model: Trainee,
        as: 'trainees',
      },
    ]
  })
}

exports.createTrainer = async (data, t) => {
  return Trainer.create(data, { transaction: t })
}

exports.updateTrainer = async (id, data, t,) => {
  return Trainer.update(data, { where: { id }, transaction: t })
}

exports.updateDefaultTrainer = async (gym_id, data, t,) => {
  return Trainer.update(data, { where: { gym_id }, transaction: t })
}

exports.deleteTrainer = async (id) => {
  return Trainer.update({ deleted: true }, { where: { id } })
}

exports.restoreTrainer = async (id) => {
  return Trainer.update({ deleted: false }, { where: { id } })
}