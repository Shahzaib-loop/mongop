const {
  trainerLogin,
  trainerLogout,
  trainerActivities,
  trainersData,
  trainerData,
  trainerCreate,
  trainerUpdate,
  trainerDelete,
  trainerRestore,
} = require("./trainer")
const {
  trainerTraineeData,
  trainerTraineeCreate,
  trainerTraineeUpdate,
  trainerTraineeDelete,
} = require("./trainerTrainee")
const {
  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,
} = require("./traineeWorkout")
const {
  trainerNoteData,
  trainerNoteCreate,
  trainerNoteUpdate,
  trainerNoteDelete,
} = require("./trainerNotes")

module.exports = {
  trainerCreate,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerActivities,
  trainerUpdate,
  trainerDelete,
  trainerRestore,

  trainerTraineeData,
  trainerTraineeCreate,
  trainerTraineeUpdate,
  trainerTraineeDelete,

  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,

  trainerNoteData,
  trainerNoteCreate,
  trainerNoteUpdate,
  trainerNoteDelete,
}
