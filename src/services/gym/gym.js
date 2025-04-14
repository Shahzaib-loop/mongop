const db = require("../../models")
const { generateTokens } = require('../../utils/auth')
const User = db.sequelize.model('unified_user_data')
const Gym = db.sequelize.model('gyms')
const Trainee = db.sequelize.model('trainees')
const Trainer = db.sequelize.model('trainers')
// const GymActivities = db.sequelize.model('gym_activities')

// const loginGym = async ({ email, password }) => {
//   const gym = await Gym.findOne({ where: { email }, raw: true })
//
//   if (!(Object.keys(gym).length > 0)) return false
//
//   const isMatch = await bcrypt.compare(password, gym.password)
//
//   if (!isMatch) return false
//
//   const tokens = generateTokens(gym)
//
//   if (!(Object.keys(tokens).length > 0)) return false
//
//   return { gym, tokens }
// }

exports.logoutGym = async (refreshToken) => {
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

exports.getGymActivities = async (id) => {
  // return GymActivities.findAll({ where: { gym_id: id }, })
}

exports.getAllGyms = async () => {
  return Gym.findAll({
    include: [
      // {
      //   model: GymActivities,
      //   as: 'gymActivities'
      // },
      {
        model: Trainee,
        as: 'gym_trainee'
      },
      {
        model: Trainer,
        as: 'gym_trainer'
      },
      {
        model: User,
        as: 'gym_users'
      },
    ]
  })
}

exports.getGymById = async (id) => {
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
      {
        model: User,
        as: 'gym_users'
      },
    ]
  })
}

exports.createGym = async (data, t) => {
  return await Gym.create(data, { transaction: t })
}

exports.updateGym = async (id, data) => {
  return Gym.update(data, { where: { id } })
}

exports.deleteGym = async (id) => {
  return Gym.update({ deleted: true }, { where: { id } })
}

exports.restoreGym = async (id) => {
  return Gym.update({ deleted: false }, { where: { id } })
}

exports.getGymTrainer = async (gym_id) => {
  return Trainer.findOne({
    where: { gym_id },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}

exports.getAllGymTrainers = async (gym_id) => {
  return Trainer.findAll({
    where: { gym_id },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}
