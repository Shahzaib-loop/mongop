const {
  addGymTrainer,
  updateGymTrainer,
  deleteGymTrainer,
  addGymTrainee,
  updateGymTrainee,
  deleteGymTrainee,
} = require('./gymTrainerAndTrainee')
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
