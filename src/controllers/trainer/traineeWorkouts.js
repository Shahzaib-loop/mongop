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
  const t = await db.sequelize.transaction()

  try {
    //  when trainer edits trainee workout then trainee id will be used to add/update workout

    const {
      trainee_id = '',
      trainer_id = '',
      // exercise_type_id = '',
      name = '',
      date = '',
      sets = 0,
      reps = 0,
      weight = 0,
    } = req?.body

    if (!(trainee_id && trainer_id &&
      // exercise_type_id &&
      name && date && sets && reps && weight)) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "data attributes are empty or invalid",
      )
    }

    const workoutPlanData = {
      name,
      date,
      trainer_id,
      trainee_id,
    }

    let workoutPlan = await trainerWorkouts.createTraineeWorkoutPlan(workoutPlanData, t)

    const workoutData = {
      // exercise_type_id,
      sets,
      reps,
      weight,
      workout_plan_id: workoutPlan.id
    }

    let workout = await trainerWorkouts.createTraineeWorkout(workoutData, t)

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

    await t.commit()

    return responseHandler.success(res, "Workout Created successfully", workout)
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, error.message, "")
  }
}

exports.traineeWorkoutUpdate = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: workout_id = '' } = req.params
    const {
      trainee_id,
      trainer_id,
      exercise_type_id,
      ...rest
    } = req?.body

    const {
      name = '',
      date = '',
      sets = 0,
      reps = 0,
      weight = 0,
    } = rest

    if (name || date) {
      let tempData = name && date
        ? { name, date }
        : date
          ? { date }
          : { name }
      await trainerWorkouts.updateTraineeWorkoutPlan(workout_id, tempData, t)
    }

    await trainerWorkouts.updateTraineeWorkout(workout_id, { sets, reps, weight }, t)

    await t.commit()

    return responseHandler.success(res, "Trainee Workout Updated Successfully",)
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, error.message, "")
  }
}

exports.traineeWorkoutDelete = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: workout_plan_id = '' } = req.params


    if (!workout_plan_id) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "data attributes are empty or invalid",
      )
    }

    await trainerWorkouts.deleteTraineeWorkoutPlan(workout_plan_id, t)

    await trainerWorkouts.deleteTraineeWorkout(workout_plan_id, t)

    await t.commit()

    return responseHandler.success(res, "Trainee Workout Deleted Successfully", 'trainerWorkout')
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, error.message, "")
  }
}
