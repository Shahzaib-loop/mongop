const {
  gymCreate,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymActivities,
  gymUpdate,
  gymDelete,
  gymRestore,
} = require("./gym")
const {
  addGymTrainer,
  updateGymTrainer,
  deleteGymTrainer,
} = require('./gymTrainer')
const {
  addGymTrainee,
  updateGymTrainee,
  deleteGymTrainee,
} = require('./gymTrainee')

module.exports = {
  gymCreate,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymActivities,
  gymUpdate,
  gymDelete,
  gymRestore,

  addGymTrainer,
  updateGymTrainer,
  deleteGymTrainer,

  addGymTrainee,
  updateGymTrainee,
  deleteGymTrainee,
}
