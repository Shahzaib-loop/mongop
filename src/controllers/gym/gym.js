const db = require('../../models')
const bcrypt = require("bcryptjs")
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { addActivity } = require("../../utils/activities")
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { generateTokens } = require('../../utils/auth');
const Gym = db.sequelize.model('gyms')
// const GymActivities = db.sequelize.model('gym_activities')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const user = require("../../services/user/user")
const gym = require("../../services/gym/gym")
const gymOwner = require("../../services/gym/gymOwner")
const trainer = require('../../services/trainer/trainer')

//  when register api hit, it will just add data & send code to email or number
//  after verification the account will register & user will login with access & refresh tokens
//  there will be timer to verify, when timer ends the user will be soft deleted

exports.gymLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req?.body

    if (!(email && password)) {
      logger.info(`Gym Login Failed as 
        ${ !(email && password)
        ? 'email and password'
        : !email ? 'email' : 'password' } 
        are empty`)
      return responseHandler.unauthorized(
        res,
        "Invalid Email or Password",
        "email or password is incorrect"
      )
    }

    const userData = await user.findUserByEmail(email)

    if (!userData) {
      return responseHandler.unauthorized(
        res,
        "Invalid Email or Password",
        "email or password is incorrect or no data found"
      )
    }

    const isMatch = await bcrypt.compare(password, userData.password)
    if (!isMatch) {
      return responseHandler.unauthorized(
        res,
        "Invalid Email or Password",
        "email or password is incorrect or incorrect data"
      )
    }

    const token = generateTokens(userData)

    return responseHandler.success(res, "Gym Login successfully", { token, userData, })
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymLogout = async (req, res) => {
  try {
    const { refreshToken = '' } = req?.body

    if (!refreshToken) {
      return responseHandler.error(
        res,
        400,
        "Refresh token required",
        "refresh token is missing"
      )
    }

    const result = await gym.logoutGym(refreshToken)

    if (!result) {
      return responseHandler.error(res, 500, "Logout failed", "failed to process logout")
    }

    responseHandler.success(res, "Gym Logout successfully", result)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message)
  }
}

exports.gymActivities = async (req, res) => {
  try {
    const { id = '' } = req?.params

    const data = await gym.getGymActivities(id)

    responseHandler.success(res, "Gym Activities Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymAll = async (req, res) => {
  try {
    const data = await gym.getAllGyms()

    responseHandler.success(res, "Gyms Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymById = async (req, res) => {
  try {
    const { id = '' } = req?.params

    const data = await gym.getGymById(id)

    responseHandler.success(res, "Gym Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymCreate = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const {
      name = '',
      email = '',
      phone_number = '',
      password = '',
      address = '',
      state = '',
      city = '',
      country = '',
      zip_code = '',
      owners = []
    } = req?.body

    if (!(name && email && phone_number && password && address && state && city && country && zip_code)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    if (!(owners?.length > 0 && owners.every(ele => ele?.first_name && ele?.email && ele?.phone_number))) {
      return responseHandler.error(
        res,
        400,
        "Owner Fields are Invalid",
        "required fields for owner are empty or invalid"
      )
    }

    let isExisting = await uniqueCheck(Gym, req.body, "Gym",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // =====>>>>>>> gym owner creation
    const gymOwnerData = await gymOwner.bulkCreateGymOwner(owners, t,)

    const owner_ids = gymOwnerData.map(ele => ele.id)

    // =====>>>>>>> gym creation
    const gymData = await gym.createGym({ ...req.body, owner_ids }, t,)

    // =====>>>>>>> gym user creation
    const gymUser = await user.createUser({ linked_id: gymData.id, email, password: hashedPassword, role: 'gym' }, t,)

    // =====>>>>>>> gym update
    await gym.updateGym(gymData.id, { user_id: gymUser.id }, t)

    // =====>>>>>>> gym owner updated
    for (let i = 0; i < owner_ids; i++) {
      await gymOwner.updateGymOwner(owner_ids[i], { gym_id: gymData.id, }, t,)
    }
    const trainerDatum = {
      gym_id: gymData.id,
      role: 'trainer',
      first_name: name,
      email,
      phone_number,
      password,
      trainer_type: 'default',
    }

    // =====>>>>>>> default trainer creation
    await trainer.createTrainer(trainerDatum, t,)

    // await addActivity(GymActivities, 'gym_id', gym?.id, "GYM_CREATED", "gym registered", t)
    // await addActivity(TrainerActivities, 'trainer_id', trainer?.id, "DEFAULT_TRAINER_CREATED",
    // "default trainer created", t)

    await t.commit()

    logger.info("Gym Created")

    return responseHandler.created(
      res,
      "Gym Registered successfully",
      {
        id: gymData.id,
        phone_number: gymData.phone_number,
        address: gymData.address,
        email: gymUser.email,
        role: gymUser.role,
      }
    )
  }
  catch (error) {
    await t.rollback()
    logger.error(`${ error }`)
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdate = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: gym_id = '' } = req?.params
    const { owner_ids, phone_number, email, ...rest } = req?.body

    if (!gym_id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    await gym.updateGym(gym_id, rest, t)

    let trainerDatum = {
      first_name: rest.name,
      last_name: rest.name,
    }

    await trainer.updateDefaultTrainer(gym_id, trainerDatum, t)

    await t.commit()

    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    return responseHandler.success(res, "Gym Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdateOwner = async (req, res) => {
  try {
    const { id: owner_id = '' } = req?.params
    const { owner = {} } = req?.body

    if (!owner_id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "owner fields are empty or invalid"
      )
    }

    await gymOwner.updateGymOwner(owner_id, owner)

    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    return responseHandler.success(res, "Gym Owner Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdatePhoneNumber = async (req, res) => {
  try {
    const { id: gym_id = '' } = req?.params
    const { phone_number = '', } = req?.body

    if (!(gym_id && phone_number)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    await gym.updateGym(gym_id, { phone_number })

    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    return responseHandler.success(res, "Gym Phone Number Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdateEmail = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: gym_id = '' } = req?.params
    const { email = '', } = req?.body

    if (!(gym_id && email)) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    const gymUpdateData = await gym.updateGym(gym_id, { email }, t,)

    if (!gymUpdateData[0]) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    const gymUser = await user.findUserByLinkedId(gym_id)

    const userUpdateData = await user.updateUser(gymUser.id, { email }, t,)

    if (!userUpdateData[0]) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }
    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    await t.commit()

    return responseHandler.success(res, "Gym Email Updated successfully")
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdatePassword = async (req, res) => {
  try {
    const { id: gym_id = '' } = req?.params
    const { password = '', } = req?.body

    if (!(gym_id && password)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.updateUserPassword(gym_id, hashedPassword)

    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    return responseHandler.success(res, "Gym Password Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    // when gym deleted following will be updated
    // gyms
    // gym_owners
    // gym_activities
    // trainers (default and other trainers will be deleted)
    // trainees (trainees will be deleted)
    // trainer_activities
    // trainee_activities
    // trainer_notes
    // trainee_notes
    // all will be deleted

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid"
      )
    }

    await gym.deleteGym(id)

    // await addActivity(GymActivities, 'gym_id', id, "GYM_DELETED", "gym deleted")

    responseHandler.success(res, "Gym Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.gymRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid"
      )
    }

    await gym.restoreGym(id)

    // await addActivity(GymActivities, 'gym_id', id, "GYM_RESTORED", "gym restored")

    responseHandler.success(res, "Gym Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
