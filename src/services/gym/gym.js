const db = require("../../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../../utils/auth')
const Gym = db.sequelize.model('gyms')
const Trainee = db.sequelize.model('trainees')
const Trainer = db.sequelize.model('trainers')
// const GymActivities = db.sequelize.model('gym_activities')

const createGym = async (data, t) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let gym = await Gym.create({ ...data, password: hashedPassword }, { transaction: t })

  return gym
}

const loginGym = async ({ email, password }) => {
  const gym = await Gym.findOne({ where: { email }, raw: true })

  if (!(Object.keys(gym).length > 0)) return false

  const isMatch = await bcrypt.compare(password, gym.password)

  if (!isMatch) return false

  const tokens = generateTokens(gym)

  if (!(Object.keys(tokens).length > 0)) return false

  return { gym, tokens }
}

const logoutGym = async (refreshToken) => {
  try {
    // In a production environment, you would want to:
    // 1. Add the refresh token to a blacklist in Redis/database
    // 2. Set an expiry on the blacklisted token
    // For now, we'll just return success
    return { success: true, message: "Logged out successfully" }
  }
  catch (error) {
    return false
  }
}

const getGyms = async () => {
  return Gym.findAll({
    include: [
      {
        // model: GymActivities,
        as: 'gymActivities'
      },
      {
        model: Trainee,
        as: 'gymTrainee'
      },
      {
        model: Trainer,
        as: 'gymTrainer'
      },
    ]
  })
}

const getGym = async (id) => {
  return Gym.findOne({
    where: { id },
    include: [
      // {
      //   model: GymActivities,
      //   as: 'gymActivities'
      // },
      {
        model: Trainer,
        as: 'trainers',
        include: [
          {
            model: Trainee,
            as: 'trainees'
          },
        ]
      },

    ]
  })
}

const getGymActivities = async (id) => {
  // return GymActivities.findAll({ where: { gymId: id }, })
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

const getGymTrainer = async (gymId) => {
  return Trainer.findOne({
    where: { gymId },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}

const getAllGymTrainers = async (gymId) => {
  return Trainer.findAll({
    where: { gymId },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}

module.exports = {
  createGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  getGymActivities,
  updateGym,
  deleteGym,
  restoreGym,
  getGymTrainer,
  getAllGymTrainers,
}