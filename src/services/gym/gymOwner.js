const db = require("../../models")
const GymOwner = db.sequelize.model('gym_owners')
// const GymActivities = db.sequelize.model('gym_activities')

exports.getAllGymOwners = async (gym_id) => {
  return GymOwner.findAll({ where: { gym_id } })
}

exports.getGymOwnerById = async (id) => {
  return GymOwner.findOne({ where: { id } })
}

exports.createGymOwner = async (data, t) => {
  return GymOwner.create(data, { transaction: t })
}

exports.bulkCreateGymOwner = async (data, t) => {
  return GymOwner.bulkCreate(data, { returning: true, transaction: t })
}

exports.updateGymOwner = async (id, data, t,) => {
  return GymOwner.update(data, { where: { id }, transaction: t })
}

exports.deleteGymOwner = async (id, data, t) => {
  return GymOwner.update(data, { where: { id }, transaction: t })
}

exports.restoreGymOwner = async (id, data, t) => {
  return GymOwner.update(data, { where: { id }, transaction: t })
}
