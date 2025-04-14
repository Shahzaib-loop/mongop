const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const bcrypt = require('bcryptjs');
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const trainee = require("../../services/trainee/trainee")
const trainer = require('../../services/trainer/trainer')

exports.traineeLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req?.body

    if (!(email && password)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    const resp = await trainee.loginTrainee({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    responseHandler.success(res, "Admin Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeLogout = async (req, res) => {
  try {
    const tokens = await trainee.logoutTrainee(req.body)

    responseHandler.success(res, "Trainee Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeActivities = async (req, res) => {
  try {
    const { id = '' } = req?.params

    const data = await trainee.trainee.getTraineeActivities(id)

    responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineesData = async (req, res) => {
  try {
    const data = await trainee.trainee.getAllTrainees()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeData = async (req, res) => {
  try {
    const { id = '' } = req?.params

    const data = await trainee.getTraineeById(id)

    responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeCreate = async (req, res) =>  {
  try {
    const {
      trainer_id = '',
      firstName = '',
      lastName = '',
      email = '',
      number = '',
    } = req?.body

    if (!(trainer_id && firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const tempPassword = 'tester'
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    const trainerData = await trainer.getTrainer(trainer_id)

    if (!(trainerData?.id && trainerData?.gym_id)) {
      return responseHandler.error(res, 500, 'Server Error', 'internal server error')
    }

    let trainee = await trainee.createTrainee({
      ...req.body,
      trainer_id,
      gym_id: trainerData.gym_id,
      password: hashedPassword
    })

    if (!(Object.keys(trainee).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    // await addActivity(
    //   TrainerActivities,
    //   'trainer_id',
    //   trainer_id,
    //   "TRAINER_CREATED_TRAINEE",
    //   "trainer created trainee"
    // )
    // await addActivity(
    //   TraineeActivities,
    //   'trainee_id',
    //   trainee.id,
    //   "TRAINEE_CREATED_BY_TRAINER",
    //   "trainee created by trainer"
    // )

    responseHandler.success(res, "Trainee Created Successfully", trainee)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    await trainee.updateTrainee(id, rest)

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_UPDATED", "trainee updated")

    responseHandler.success(res, "Trainee Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await trainee.deleteTrainee(id)

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_DELETED", "trainee deleted")

    responseHandler.success(res, "Trainee Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await trainee.restoreTrainee(id)

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_RESTORED", "trainee restored")

    responseHandler.success(res, "Trainee Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
