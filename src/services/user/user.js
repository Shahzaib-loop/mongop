const db = require('../../models');
const User = db.sequelize.model('unified_user_data')
const Gym = db.sequelize.model('gyms')
const GymOwner = db.sequelize.model('gym_owners')
const Trainer = db.sequelize.model('trainers')
const Trainee = db.sequelize.model('trainees')

exports.findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    include: {
      model: Gym,
      include: [
        {
          model: GymOwner,
          as: 'owners',
        },
        {
          model: Trainer,
          as: 'trainers',
        },
        {
          model: Trainee,
          as: 'trainees',
        },
      ]
    },
  })
}

exports.createUser = async (data, t) => {
  return await User.create(data, { transaction: t })
}
