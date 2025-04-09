const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
const TraineeActivities = db.sequelize.model('trainee_activities')
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
} = require("../../services/trainee/trainee")

const traineeLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body

    if (!(email && password)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    const resp = await loginTrainee({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    responseHandler.success(res, "Admin Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeLogout = async (req, res) => {
  try {
    const tokens = await logoutTrainee(req.body)

    responseHandler.success(res, "Trainee Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeActivities = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getTraineeActivities(id)

    responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineesData = async (req, res) => {
  try {
    const data = await getTrainees()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeData = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getTrainee(id)

    responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeCreate = async (req, res) => {
  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      number = '',
      password = '',
    } = req?.body

    if (!(firstName && lastName && email && number && password)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainee = await createTrainee(req.body)

    await addActivity(TraineeActivities, 'traineeId', trainee?.id, "TRAINEE_CREATED", "trainee registered")

    responseHandler.created(res, "Trainee registered successfully", trainee)
  }
  catch (error) {
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    await updateTrainee(id, rest)

    await addActivity(TraineeActivities, 'traineeId', id, "TRAINEE_UPDATED", "trainee updated")

    responseHandler.success(res, "Trainee Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await deleteTrainee(id)

    await addActivity(TraineeActivities, 'traineeId', id, "TRAINEE_DELETED", "trainee deleted")

    responseHandler.success(res, "Trainee Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const traineeRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await restoreTrainee(id)

    await addActivity(TraineeActivities, 'traineeId', id, "TRAINEE_RESTORED", "trainee restored")

    responseHandler.success(res, "Trainee Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

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
}
