const db = require("../../models")
const GymOwners = db.sequelize.model('gym_owners')
// const GymActivities = db.sequelize.model('gym_activities')

exports.getAllGymOwners = async (gym_id) => {
  return GymOwners.findAll({ where: { gym_id } })
}

exports.getGymOwnerById = async (id) => {
  return GymOwners.findOne({ where: { id } })
}

exports.createGymOwner = async (data, t) => {
  return GymOwners.create(data, { transaction: t })
}

exports.bulkCreateGymOwner = async (data, t) => {
  return GymOwners.bulkCreate(data, { returning: true, transaction: t })
}

exports.updateGymOwner = async (id, data, t,) => {
  return GymOwners.update(data, { where: { id }, transaction: t })
}

exports.deleteGymOwner = async (id, data, t) => {
  return GymOwners.update(data, { where: { id }, transaction: t })
}

exports.restoreGymOwner = async (id, data, t) => {
  return GymOwners.update(data, { where: { id }, transaction: t })
}
