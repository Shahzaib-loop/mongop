const db = require('../../models');
const User = db.sequelize.model('unified_users')
const Gym = db.sequelize.model('gyms')
const GymOwner = db.sequelize.model('gym_owners')
const Trainer = db.sequelize.model('trainers')
const Trainee = db.sequelize.model('trainees')

exports.findUserByLinkedId = async (linked_id) => {
  return User.findOne({ where: { linked_id }, })
}

exports.findUserByEmail = async (email) => {
  return User.findOne({ where: { email }, })
}

exports.createUser = async (data, t) => {
  return User.create(data, { transaction: t })
}

exports.updateUser = async (id, data, t) => {
  return User.update(data, { where: { id }, transaction: t })
}

exports.updateUserPassword = async (linked_id, password, t) => {
  return User.update({ password }, { where: { linked_id }, transaction: t })
}
