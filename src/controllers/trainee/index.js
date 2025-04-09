const {
  traineeCreate,
  traineeLogin,
  traineeLogout,
  traineesData,
  traineeData,
  getTraineeActivities,
  traineeActivities,
  traineeUpdate,
  traineeDelete,
  traineeRestore,
} = require("./trainee")

const {
  traineeNoteData,
  traineeNoteCreate,
  traineeNoteUpdate,
  traineeNoteDelete,
} = require("./traineeNotes")

module.exports = {
  traineeCreate,
  traineeLogin,
  traineeLogout,
  traineesData,
  traineeData,
  getTraineeActivities,
  traineeActivities,
  traineeUpdate,
  traineeDelete,
  traineeRestore,

  traineeNoteData,
  traineeNoteCreate,
  traineeNoteUpdate,
  traineeNoteDelete,
}
