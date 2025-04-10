const bcrypt = require('bcryptjs')
const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require('../../utils/uniqueCheck');
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
// const TrainerActivities = db.sequelize.model('trainer_activities')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const {
  getTrainer,
} = require('../../services/trainer/trainer')
const {
  getTrainerTrainee,
  updateTrainerTrainee,
} = require('../../services/trainer/trainerTrainee')

const trainerTraineeData = async (req, res) => {
  try {
    const { trainerId = '', } = req?.body

    if (!(trainerId)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let traineesData = await getTrainerTrainee(trainerId)

    responseHandler.success(res, "Trainees Fetched Successfully", traineesData)
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerTraineeUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { trainerId, email, number, ...rest } = req?.body

    if (!(id && trainerId && rest?.firstName?.length > 0 && rest?.lastName?.length > 0)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    await updateTrainerTrainee(id, rest)

    // await addActivity(
    //   trainerActivities,
    //   'trainerId',
    //   trainerId,
    //   'TRAINER_UPDATED_TRAINEE',
    //   'trainer updated trainee'
    // )
    // await addActivity(
    //   traineeActivities,
    //   'traineeId',
    //   id,
    //   'TRAINEE_UPDATED_BY_TRAINER',
    //   'trainee updated by trainer'
    // )

    responseHandler.success(res, "Trainee Updated Successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerTraineeUpdatePassword = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { trainerId = '', password = '' } = req?.body

    if (!(trainerId && password)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerTraineeUpdateEmail = async (req, res) => {
  try {
    const { id } = req?.params
    const { trainerId = '', password = '' } = req?.body

    if (!(trainerId && password)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

module.exports = {
  trainerTraineeData,
  trainerTraineeUpdate,
  trainerTraineeUpdatePassword,
  trainerTraineeUpdateEmail,
}
