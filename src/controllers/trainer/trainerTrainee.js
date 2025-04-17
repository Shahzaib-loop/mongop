const bcrypt = require('bcryptjs')
const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require('../../utils/uniqueCheck');
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
// const TrainerActivities = db.sequelize.model('trainer_activities')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const trainer = require('../../services/trainer/trainer')
const trainerTrainee = require('../../services/trainer/trainerTrainee')

exports.trainerTraineeData = async (req, res) => {
  try {
    const { trainer_id = '', } = req?.body

    if (!(trainer_id)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let traineesData = await trainerTrainee.getTrainerTrainee(trainer_id)

    return responseHandler.success(res, "Trainees Fetched Successfully", traineesData)
  }
  catch (error) {
    return responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerTraineeUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { trainer_id, email, number, ...rest } = req?.body

    if (!(id && trainer_id && rest?.first_name?.length > 0 && rest?.last_name?.length > 0)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    await trainerTrainee.updateTrainerTrainee(id, rest)

    // await addActivity(
    //   trainerActivities,
    //   'trainer_id',
    //   trainer_id,
    //   'TRAINER_UPDATED_TRAINEE',
    //   'trainer updated trainee'
    // )
    // await addActivity(
    //   traineeActivities,
    //   'trainee_id',
    //   id,
    //   'TRAINEE_UPDATED_BY_TRAINER',
    //   'trainee updated by trainer'
    // )

    return responseHandler.success(res, "Trainee Updated Successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerTraineeUpdatePassword = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { trainer_id = '', password = '' } = req?.body

    if (!(trainer_id && password)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }
  }
  catch (error) {
    return responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerTraineeUpdateEmail = async (req, res) => {
  try {
    const { id } = req?.params
    const { trainer_id = '', password = '' } = req?.body

    if (!(trainer_id && password)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }
  }
  catch (error) {
    return responseHandler.error(res, 500, error.message, "")
  }
}
