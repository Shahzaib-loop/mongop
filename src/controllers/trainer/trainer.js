const db = require('../../models')
const bcrypt = require('bcryptjs');
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainer = db.sequelize.model('trainers')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const user = require('../../services/user/user');
const trainer = require("../../services/trainer/trainer")

exports.trainerLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req?.body

    if (!(email && password)) {
      return responseHandler.unauthorized(
        res,
        "Email or Password is Incorrect",
        "email or password is incorrect or no data found",
      )
    }

    const resp = await trainer.loginTrainer({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      return responseHandler.unauthorized(
        res,
        "Email or Password is Incorrect",
        "email or password is incorrect or no data found",
      )
    }

    responseHandler.success(res, "Gym Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerLogout = async (req, res) => {
  try {
    const tokens = await trainer.logoutTrainer(req.body)

    responseHandler.success(res, "Trainer Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerActivities = async (req, res) => {
  try {
    const { id = '' } = req?.params

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    const data = await trainer.getTrainerActivities(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerAll = async (req, res) => {
  try {
    const data = await trainer.getAllTrainers()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerById = async (req, res) => {
  try {
    const { id = '' } = req?.params

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    const data = await trainer.getTrainerById(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerCreate = async (req, res) => {
  const t = await db.sequelize.transaction()
  const tempPassword = 'Trainer1234'

  try {
    const {
      gym_id = '',
      first_name = '',
      last_name = '',
      email = '',
      phone_number = '',
    } = req?.body

    if (!(gym_id && first_name && last_name && email && phone_number)) {
      await t.rollback()
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "Trainer",)

    if (isExisting?.reason) {
      await t.rollback()
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainerData = await trainer.createTrainer({ ...req.body, trainerType: 'non_default', }, t,)

    if (!(trainerData?.id && trainerData?.gym_id)) {
      await t.rollback()
      return responseHandler.error(res, 400, "Failed to create trainer record")
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10)
    const userData = await user.createUser({
        linked_id: trainerData.id,
        email,
        password: hashedPassword,
        role: 'trainer',
      },
      t,
    )

    if (!userData?.id) {
      await t.rollback()
      return responseHandler.error(res, 400, "Failed to Create Trainer's User")
    }

    await trainer.updateTrainer(trainerData.id, { user_id: userData.id }, t,)

    // await addActivity(
    //   GymActivities,
    //   'gym_id',
    //   gym_id,
    //   "GYM_ADDED_TRAINER",
    //   "gym added trainer"
    // )
    // await addActivity(
    //   TrainerActivities,
    //   'trainer_id',
    //   trainerData.id,
    //   "TRAINER_CREATED_BY_GYM",
    //   "trainer created by gym"
    // )

    await t.commit()

    return responseHandler.success(res, "Trainer Created Successfully", trainerData)
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerUpdate = async (req, res) => {
  try {
    const { id: trainer_id = '' } = req?.params
    const { gym_id, user_id, email, phone_number, trainer_type, ...rest } = req?.body

    if (!trainer_id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainer.updateTrainer(trainer_id, rest)

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    return responseHandler.success(res, "Trainer Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerUpdatePhone = async (req, res) => {
  try {
    const { id: trainer_id = '', } = req?.params
    const { gym_id: gymId = '', phone_number = '', } = req?.body
    let trainerData = {}
    let gym_id = gymId

    if (!gymId) {
      trainerData = await trainer.getTrainerById(trainer_id)
      gym_id = trainerData.gym_id
    }

    if (!(trainer_id && gym_id && phone_number)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainer.updateTrainerByGymId(trainer_id, gym_id, { phone_number },)

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    return responseHandler.success(res, "Trainer Phone Number Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerUpdateEmail = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: trainer_id = '' } = req?.params
    const { gym_id: gymId = '', email = '', } = req?.body
    let trainerData = {}
    let gym_id = gymId

    if (!gymId) {
      trainerData = await trainer.getTrainerById(trainer_id)
      gym_id = trainerData.gym_id
    }

    if (!(trainer_id && gym_id && email)) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    const trainerUpdateData = await trainer.updateTrainerByGymId(trainer_id, gym_id, { email }, t)

    if (!trainerUpdateData[0]) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    let userData = await user.findUserByLinkedId(trainer_id)

    const userUpdateData = await user.updateUser(userData.id, { email }, t)

    if (!userUpdateData[0]) {
      await t.rollback()

      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    await t.commit()

    return responseHandler.success(res, "Trainer Email Updated successfully")
  }
  catch (error) {
    await t.rollback()
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerUpdatePassword = async (req, res) => {
  try {
    const { id: trainer_id = '' } = req?.params
    const { gym_id: gymId = '', password = '', } = req?.body
    let trainerData = {}
    let gym_id = gymId

    if (!gymId) {
      trainerData = await trainer.getTrainerById(trainer_id)
      gym_id = trainerData.gym_id
    }

    if (!(trainer_id && gym_id && password)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.updateUserPassword(trainer_id, hashedPassword)

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    responseHandler.success(res, "Trainer Password Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainer.deleteTrainer(id)

    // await addActivity(TrainerActivities, id, "TRAINER_DELETED", "trainer deleted")

    responseHandler.success(res, "Trainer Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

exports.trainerRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainer.restoreTrainer(id)

    // await addActivity(TrainerActivities, id, "TRAINER_RESTORED", "trainer restored")

    responseHandler.success(res, "Trainer Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
