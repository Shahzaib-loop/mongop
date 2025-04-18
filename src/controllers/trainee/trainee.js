const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const bcrypt = require('bcryptjs');
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const user = require('../../services/user/user');
const trainer = require("../../services/trainer/trainer")
const trainee = require("../../services/trainee/trainee")
const { generateTokens } = require('../../utils/auth');

exports.traineeLogin = async (req, res) => {
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

    const traineeData = await trainee.getTraineeById(userData.linked_id)

    const tokens = generateTokens({ id: traineeData.id, role: userData.role })

    if (!(Object.keys(traineeData).length > 0)) {
      return responseHandler.unauthorized(
        res,
        "Unauthorized",
        "email or password not found",
      )
    }

    return responseHandler.success(
      res,
      "Trainee Login successfully",
      { tokens, traineeData },
    )
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeLogout = async (req, res) => {
  try {
    const tokens = await trainee.logoutTrainee(req.body)

    return responseHandler.success(res, "Trainee Logout successfully", tokens)
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeActivities = async (req, res) => {
  try {
    const { id = '' } = req?.params

    const data = await trainee.trainee.getTraineeActivities(id)

    return responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeAllByTrainerId = async (req, res) => {
  try {
    const { trainer_id = '' } = req.body

    if (!trainer_id) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    const data = await trainee.getAllTraineeByTrainerId(trainer_id)

    return responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeById = async (req, res) => {
  try {
    const { id: trainee_id = '' } = req?.params

    if (!trainee_id) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    const data = await trainee.getTraineeById(trainee_id)

    return responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeCreate = async (req, res) => {
  const t = await db.sequelize.transaction()
  const tempPassword = 'Trainee1234'

  try {
    const {
      gym_id = '',
      first_name = '',
      age = '',
      email = '',
      phone_number = '',
    } = req?.body

    if (!(gym_id && first_name && age && email && phone_number)) {
      await t.rollback()
      return responseHandler.unauthorized(
        res,
        "Invalid Data",
        "data is not correct",
      )
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      await t.rollback()
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainerData = await trainer.getTrainerByGymId(gym_id)

    let traineeData = await trainee.createTrainee({ ...req.body, trainer_id: trainerData.id }, t,)

    if (!(traineeData?.id && traineeData?.gym_id && traineeData?.trainer_id)) {
      await t.rollback()
      return responseHandler.error(res, 400, "Failed to create trainer record")
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10)
    const userData = await user.createUser({
        linked_id: traineeData.id,
        email,
        password: hashedPassword,
        role: 'trainee',
      },
      t,
    )

    if (!userData?.id) {
      await t.rollback()
      return responseHandler.error(res, 400, "Failed to Create Trainee's User")
    }

    console.log(userData.id, "userData.iduserData.iduserData.id")
    console.log(traineeData.id, "traineeData.idtraineeData.idtraineeData.id")

    let tt = await trainee.updateTrainee(traineeData.id, { user_id: userData.id }, t,)

    console.log(tt, "tttttttttttttttt")

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

    await t.commit()

    return responseHandler.success(res, "Trainee Created Successfully", traineeData)
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const {
      user_id,
      gym_id,
      trainer_id,
      email,
      phone_number,
      rating,
      deleted,
      ...rest
    } = req?.body

    await trainee.updateTrainee(id, rest)

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_UPDATED", "trainee updated")

    responseHandler.success(res, "Trainee Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeUpdatePhone = async (req, res) => {
  try {
    const { id: trainee_id = '', } = req?.params
    const { phone_number = '', } = req?.body

    if (!(trainee_id && phone_number)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    await trainee.updateTrainee(trainee_id, { phone_number })

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_UPDATED", "trainee updated")

    return responseHandler.success(res, "Trainee Phone Number Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeUpdateEmail = async (req, res) => {
  const t = await db.sequelize.transaction()

  try {
    const { id: trainee_id = '' } = req?.params
    const { email = '', } = req?.body

    if (!(trainee_id && email)) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    const traineeUpdateData = await trainee.updateTrainee(trainee_id, { email }, t,)

    if (!traineeUpdateData[0]) {
      await t.rollback()
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "required fields are empty or invalid",
      )
    }

    let userData = await user.findUserByLinkedId(trainee_id)

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

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_UPDATED", "trainee updated")

    await t.commit()

    return responseHandler.success(res, "Trainee Email Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}

exports.traineeUpdatePassword = async (req, res) => {
  try {
    const { id: trainee_id = '' } = req?.params
    const { password = '', } = req?.body

    if (!(trainee_id && password)) {
      return responseHandler.error(
        res,
        400,
        "Required Fields are Invalid",
        "Id is empty or invalid",
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.updateUserPasswordByLinkedId(trainee_id, hashedPassword)

    // await addActivity(TraineeActivities, 'trainee_id', id, "TRAINEE_UPDATED", "trainee updated")

    return responseHandler.success(res, "Trainee Password Updated successfully")
  }
  catch (error) {
    return responseHandler.error(res, 500, "Internal Server Error", error.message,)
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
    responseHandler.error(res, 500, "Internal Server Error", error.message,)
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
    responseHandler.error(res, 500, "Internal Server Error", error.message,)
  }
}
