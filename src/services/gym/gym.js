const db = require("../../models")
const { generateTokens } = require('../../utils/auth')
// const User = db.sequelize.model('unified_users')
// const Gym = db.sequelize.model('gyms')
// const GymOwner = db.sequelize.model('gym_owners')
// const Trainee = db.sequelize.model('trainees')
// const Trainer = db.sequelize.model('trainers')

const User = db.unified_users
// const { Gym } = require('../../models'); // or wherever your model path is
const Gym  = require('../../models/gym'); // or wherever your model path is
const GymOwner = db.gym_owners
const Trainee = db.trainees
const Trainer = db.trainers

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
        model: GymOwner,
        as: 'owners',
      },
      {
        model: Trainer,
        as: 'trainers',
        include: {
          model: Trainee,
          as: 'trainees',
        },
      },
      {
        model: User,
        as: 'gym_user',
        attributes: ['linked_id', 'email', 'role', 'deleted', 'createdAt', 'updatedAt',]
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
        model: GymOwner,
        as: 'owners',
      },
      {
        model: Trainer,
        as: 'trainers',
        include: [
          {
            model: Trainee,
            as: 'trainees',
          },
        ]
      },
      {
        model: User,
        as: 'gym_user',
        attributes: ['linked_id', 'email', 'role', 'deleted', 'createdAt', 'updatedAt',]
      },
    ]
  })
}

exports.createGym = async (data, t) => {
  return Gym.create(data, { transaction: t })
}

exports.updateGym = async (id, data, t,) => {
  return Gym.update(data, { where: { id }, transaction: t })
}

exports.deleteGym = async (id) => {
  return Gym.update({ deleted: true }, { where: { id } })
}

exports.restoreGym = async (id) => {
  return Gym.update({ deleted: false }, { where: { id } })
}
