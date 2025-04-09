const {
  createTrainee,
  loginTrainee,
  logoutTrainee,
  getTrainees,
  getTrainee,
  getTraineeActivities,
  updateTrainee,
  deleteTrainee,
  restoreTrainee,
} = require('./trainee')
const {
  getTraineeNote,
  createTraineeNote,
  updateTraineeNote,
  deleteTraineeNote,
} = require('./traineeNotes')

module.exports = {
  createTrainee,
  loginTrainee,
  logoutTrainee,
  getTrainees,
  getTrainee,
  getTraineeActivities,
  updateTrainee,
  deleteTrainee,
  restoreTrainee,

  getTraineeNote,
  createTraineeNote,
  updateTraineeNote,
  deleteTraineeNote,
}
