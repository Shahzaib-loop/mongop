const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Gym = db.sequelize.model('Gym')
const Trainer = db.sequelize.model('Trainer')
const Trainee = db.sequelize.model('Trainee')
const GymActivities = db.sequelize.model('GymActivities')
const TrainerActivities = db.sequelize.model('TrainerActivities')
const TraineeActivities = db.sequelize.model('TraineeActivities')
const {
  createGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  getGymActivities,
  updateGym,
  deleteGym,
  restoreGym,
} = require("../../services/gym")
const { createTrainer } = require('../../services/trainer');
const { createTrainee } = require('../../services/trainee');

//  when register api hit, it will just add data & send code to email or number
//  after verification the account will register & user will login with access & refresh tokens
//  there will be timer to verify, when timer ends the user will be soft deleted

const gymCreate = async (req, res) => {
  try {
    const {
      name = '',
      ownerName = '',
      email = '',
      number = '',
      password = '',
      address = '',
      state = '',
      city = '',
      country = '',
      zipCode = '',
    } = req?.body

    if (!(name && ownerName && email && number && password && address && state && city && country && zipCode)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    let isExisting = await uniqueCheck(Gym, req.body, "Gym",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const gym = await createGym(req.body)

    logger.info("Gym Created")

    await addActivity(GymActivities, 'gymId', gym?.id, "GYM_CREATED", "gym registered")

    logger.info("Gym Activity Created")
    responseHandler.created(res, "Gym Registered successfully", gym)
  }
  catch (error) {
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body

    if (!(email && password)) {
      logger.info(`Gym Login Failed as ${ !(email && password) ? 'email and password' : !email ? 'email' : 'password' } are empty`)
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    const resp = await loginGym({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      logger.info(`Gym Login Failed as ${ !(email && password) ? 'email and password' : !email ? 'email' : 'password' } are empty`)
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    responseHandler.success(res, "Gym Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymLogout = async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return responseHandler.error(res, 400, "Refresh token required", "refresh token is missing")
    }

    const result = await logoutGym(refreshToken)

    if (!result) {
      return responseHandler.error(res, 500, "Logout failed", "failed to process logout")
    }

    responseHandler.success(res, "Gym Logout successfully", result)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message)
  }
}

const gymsData = async (req, res) => {
  try {
    const data = await getGyms()

    responseHandler.success(res, "Gyms Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymData = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getGym(id)

    responseHandler.success(res, "Gym Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymActivities = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getGymActivities(id)

    responseHandler.success(res, "Gym Activities Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    await updateGym(id, rest)

    await addActivity(GymActivities, 'gymId', id, "GYM_UPDATED", "gym updated")

    responseHandler.success(res, "Gym Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const gymDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await deleteGym(id)

    await addActivity(GymActivities, id, "GYM_DELETED", "gym deleted")

    responseHandler.success(res, "Gym Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const gymRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await restoreGym(id)

    await addActivity(GymActivities, id, "GYM_RESTORED", "gym restored")

    responseHandler.success(res, "Gym Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const addTrainer = async (req, res) => {
  try {
    const { id = '', } = req?.params
    const { firstName, lastName, email, number, } = req?.body

    // console.log(req.params, 'params tttttttttttttt')
    // console.log(req.body, 'body tttttttttttttt')

    if (!(firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "Trainer",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    let trainer = await createTrainer({ ...req.body, gymId: id, })

    if (!(Object.keys(trainer).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    console.log(id, 'id tttttttttttttt')
    console.log(trainer.id, 'trainer tttttttttttttt')

    // await addActivity({ GymActivities, gymId: id, action: "GYM_ADDED_TRAINER", activity: "gym added trainer" })
    await addActivity(GymActivities, { gymId: id }, "GYM_ADDED_TRAINER", "gym added trainer")
    await addActivity(TrainerActivities, trainer.id, "TRAINER_CREATED_BY_GYM", "trainer created by gym")

    responseHandler.error(res, 500, "", "")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const addTrainee = async (req, res) => {
  try {
    const { firstName, lastName, email, number, } = req?.body

    if (!(firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    await traineeCreate()

    await addActivity(GymActivities, id, "GYM_UPDATED", "gym updated")

    responseHandler.error(res, 500, "", "")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

module.exports = {
  gymCreate,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymActivities,
  gymUpdate,
  gymDelete,
  gymRestore,
  addTrainer,
  addTrainee,
}
