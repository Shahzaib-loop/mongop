const db = require('../../models')
const bcrypt = require("bcryptjs")
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const User = db.sequelize.model('unified_user_data')
const Gym = db.sequelize.model('gyms')
// const GymActivities = db.sequelize.model('gym_activities')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const user = require("../../services/user/user")
const gym = require("../../services/gym/gym")
const trainer = require('../../services/trainer/trainer')
const { generateTokens } = require('../../utils/auth');

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

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return responseHandler.unauthorized(
        res,
        "Invalid Email or Password",
        "email or password is incorrect or no data found"
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return responseHandler.unauthorized(
        res,
        "Invalid Email or Password",
        "email or password is incorrect or incorrect data"
      )
    }

    const token = generateTokens(user)

    return responseHandler.success(res, "Gym Login successfully", { token, role: user.role })
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

exports.gymsData = async (req, res) => {
  try {
    const data = await gym.getAllGyms()

    responseHandler.success(res, "Gyms Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymData = async (req, res) => {
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
      owner_name = '',
      email = '',
      number = '',
      password = '',
      address = '',
      state = '',
      city = '',
      country = '',
      zip_code = '',
    } = req?.body

    if (!(name && owner_name && email && number && password && address && state && city && country && zip_code)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    let isExisting = await uniqueCheck(Gym, req.body, "Gym",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    let trainerDatum = {
      role: 'trainer',
      first_name: name,
      last_name: name,
      email,
      number,
      password,
      trainer_type: 'default',
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // =====>>>>>>> gym creation
    const gymData = await gym.createGym(req.body, t,)

    const gymUser = await user.createUser({ linked_id: gymData.id, email, password: hashedPassword, role: 'gym' }, t)

    await gym.updateGym(gymData.id, { user_id: gymUser.id }, t)

    // =====>>>>>>> default trainer creation
    const trainerData = await trainer.createTrainer({ ...trainerDatum, gym_id: gymData.id }, t,)

    const trainerUser = await user.createUser(
      {
        email,
        linked_id: trainerData.id,
        password: hashedPassword,
        role: 'trainer'
      },
      t,
    )

    await trainer.updateTrainer(trainerData.id, { user_id: trainerUser.id }, t)

    // await addActivity(GymActivities, 'gym_id', gym?.id, "GYM_CREATED", "gym registered", t)
    // await addActivity(TrainerActivities, 'trainer_id', trainer?.id, "DEFAULT_TRAINER_CREATED", "default trainer
    // created", t)

    await t.commit()

    logger.info("Gym Created")

    responseHandler.created(
      res,
      "Gym Registered successfully, Default Trainer also Registered",
      {
        id: gymData.id,
        name: gymData.name,
        address: gymData.address,
        email: gymUser.email,
        role: gymUser.role,
        gymTrainer: {
          id: trainerData.id,
          name: trainerData.name,
          address: trainerData.address,
          email: trainerUser.email,
          role: trainerUser.role,
        },
      }
    )
  }
  catch (error) {
    await t.rollback()
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid"
      )
    }

    await gym.updateGym(id, rest)

    // await addActivity(GymActivities, 'gym_id', id, "GYM_UPDATED", "gym updated")

    responseHandler.success(res, "Gym Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.gymDelete = async (req, res) => {
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
