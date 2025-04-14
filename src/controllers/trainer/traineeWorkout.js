const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { addActivity } = require("../../utils/activities")
// const TrainerActivities = db.sequelize.model('trainer_activities')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const trainerWorkouts = require('../../services/trainer/trainerWorkouts')

// =======>>> Workout by Trainer for Trainee
exports.traineeWorkoutData = async (req, res) => {
  try {
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.traineeWorkoutCreate = async (req, res) => {
  try {
    //  when trainer edits trainee workout then trainee id will be used to add/update workout

    const { trainee_id = '' } = req?.params
    const { trainer_id = '', exerciseType = '', sets = 0, reps = 0 } = req?.body

    if (!(trainee_id && trainer_id && exerciseType && sets && reps)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    let workout = await trainerWorkouts.createTraineeWorkout({ ...req.body, trainee_id })

    console.log(workout, "workout tttttttttttt")

    // await addActivity(
    //   TraineeActivities,
    //   'trainee_id',
    //   trainee_id,
    //   "WORKOUT_ADDED_FOR_TRAINEE",
    //   "workout added for trainee"
    // )
    // await addActivity(
    //   TrainerActivities,
    //   'trainer_id',
    //   trainer_id,
    //   "TRAINER_ADDED_WORKOUT",
    //   "trainer added workout"
    // )

    responseHandler.success(res, "Gym Data Fetched successfully", workout)
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.traineeWorkoutUpdate = async (req, res) => {
  try {

  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.traineeWorkoutDelete = async (req, res) => {
  try {

  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
