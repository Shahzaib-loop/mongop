const {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  getTrainerActivities,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,
} = require('./trainer')
const {
  getTrainerTrainee,
  createTrainerTrainee,
  updateTrainerTrainee,
  deleteTrainerTrainee,
} = require('./trainerTrainee')
const {
  getTraineeWorkout,
  createTraineeWorkout,
  updateTraineeWorkout,
  deleteTraineeWorkout,
} = require('./trainerWorkouts')
const {
  getTrainerNote,
  createTrainerNote,
  updateTrainerNote,
  deleteTrainerNote,
} = require('./trainerNotes')

module.exports = {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  getTrainerActivities,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,

  getTrainerTrainee,
  createTrainerTrainee,
  updateTrainerTrainee,
  deleteTrainerTrainee,

  getTraineeWorkout,
  createTraineeWorkout,
  updateTraineeWorkout,
  deleteTraineeWorkout,

  getTrainerNote,
  createTrainerNote,
  updateTrainerNote,
  deleteTrainerNote,
}