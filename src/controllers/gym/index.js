const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const Gym = db.sequelize.model('Gym')
const { addActivity } = require("../../services/gymActivities")
const {
  registerGym,
  loginGym,
  logoutGym,
  getGyms,
  getGym,
  updateGym,
  deleteGym,
  restoreGym,
} = require("../../services/gym")

//  when register api hit, it will just add data & send code to email or number
//  after verification the account will register & user will login with access & refresh tokens
//  there will be timer to verify, when timer ends the user will be soft deleted

const gymRegister = async (req, res) => {
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

    const gym = await registerGym(req.body)

    await addActivity({ gymId: gym?.id, action: "GYM_CREATED", activity: "gym registered" })

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
      return responseHandler.error(res, 400, "Required Fields are Invalid", "invalid email or password")
    }

    const tokens = await loginGym({ email, password })

    responseHandler.success(res, "Gym Login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const gymLogout = async (req, res) => {
  try {
    const tokens = await logoutGym(req.body)

    responseHandler.success(res, "Gym Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
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

const gymUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    await updateGym(id, rest)

    await addActivity({ gymId: id, action: "GYM_UPDATED", activity: "gym updated" })

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

    await addActivity({ gymId: id, action: "GYM_DELETED", activity: "gym deleted" })

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

    await addActivity({ gymId: id, action: "GYM_RESTORED", activity: "gym restored" })

    responseHandler.success(res, "Gym Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

module.exports = {
  gymRegister,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymUpdate,
  gymDelete,
  gymRestore,
}
