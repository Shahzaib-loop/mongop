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
const { generateTokens } = require('../../utils/auth');
const trainee = require('../../services/trainee/trainee');

exports.trainerLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req?.body

    if (!(email && password)) {
      return responseHandler.unauthorized(
        res,
        "Unauthorized",
        "email or password not found",
      )
    }

    const userData = await user.findUserByEmail(email)

    if (!(Object.keys(userData).length > 0)) {
      return responseHandler.unauthorized(
        res,
        "Unauthorized",
        "email or password not found",
      )
    }

    const isMatch = await bcrypt.compare(password, userData.password)

    if (!isMatch) {
      return responseHandler.unauthorized(
        res,
        "Unauthorized",
        "email or password not found",
      )
    }

    const trainerData = await trainer.getTrainerById(userData?.linked_id)

    // console.log(userData.id, "1userDatauserDatauserData")
    // console.log(userData.linked_id, "2userDatauserDatauserData")
    console.log(trainerData, "3userDatauserDatauserData")

    if (!trainerData.id) {
      return responseHandler.unauthorized(
        res,
        "Unauthorized",
        "email or password not found",
      )
    }

    const tokens = generateTokens({ id: trainerData?.id, role: userData?.role })

    return responseHandler.success(
      res,
      "Gym Login successfully",
      { tokens, trainerData },
    )
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
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
      email = '',
      phone_number = '',
    } = req?.body

    if (!(gym_id && first_name && email && phone_number)) {
      await t.rollback()
      return responseHandler.unauthorized(
        res,
        "Invalid Data",
        "data is not correct",
      )
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
    const {
      gym_id,
      user_id,
      trainer_type,
      email,
      phone_number,
      deleted,
      ...rest
    } = req?.body

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
    const { phone_number = '', } = req?.body

    if (!(trainer_id && phone_number)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainer.updateTrainer(trainer_id, { phone_number },)

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
    const { email = '', } = req?.body

    if (!(trainer_id && email)) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    const trainerUpdateData = await trainer.updateTrainer(trainer_id, { email }, t)

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

    if (!userData.id) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

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
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.trainerUpdatePassword = async (req, res) => {
  try {
    const { id: trainer_id = '' } = req?.params
    const { password = '', } = req?.body

    if (!(trainer_id && password)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.updateUserPasswordByLinkedId(trainer_id, hashedPassword)

    // await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    return responseHandler.success(res, "Trainer Password Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
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

    return responseHandler.success(res, "Trainer Deleted successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
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

    return responseHandler.success(res, "Trainer Restored successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, error.message, "")
  }
}
