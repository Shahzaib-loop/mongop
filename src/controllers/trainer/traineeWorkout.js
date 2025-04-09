const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { addActivity } = require("../../utils/activities")
const TrainerActivities = db.sequelize.model('trainer_activities')
const TraineeActivities = db.sequelize.model('trainee_activities')
const { createTraineeWorkout } = require('../../services/trainer')

// =======>>> Workout by Trainer for Trainee
const traineeWorkoutData = async (req, res) => {
  try {
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const traineeWorkoutCreate = async (req, res) => {
  try {
    //  when trainer edits trainee workout then trainee id will be used to add/update workout

    const { traineeId = '' } = req.params
    const { trainerId = '', exerciseType = '', sets = 0, reps = 0 } = req.body

    if (!(traineeId && trainerId && exerciseType && sets && reps)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    let workout = await createTraineeWorkout({ ...req.body, traineeId })

    console.log(workout, "workout tttttttttttt")

    await addActivity(
      TraineeActivities,
      'traineeId',
      traineeId,
      "WORKOUT_ADDED_FOR_TRAINEE",
      "workout added for trainee"
    )
    await addActivity(
      TrainerActivities,
      'trainerId',
      trainerId,
      "TRAINER_ADDED_WORKOUT",
      "trainer added workout"
    )

    responseHandler.success(res, "Gym Data Fetched successfully", workout)
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const traineeWorkoutUpdate = async (req, res) => {
  try {

  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const traineeWorkoutDelete = async (req, res) => {
  try {

  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

module.exports = {
  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,
}
