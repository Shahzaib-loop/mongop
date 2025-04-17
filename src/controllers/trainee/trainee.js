const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const bcrypt = require('bcryptjs');
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const trainee = require("../../services/trainee/trainee")
const user = require('../../services/user/user');

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

    return responseHandler.success(res, "Trainee Data Fetched successfully", data)
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
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
    return responseHandler.error(res, 500, "", error.message,)
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
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.traineeCreate = async (req, res) => {
  const t = await db.sequelize.transaction()
  const tempPassword = 'Trainee1234'

  try {
    const {
      gym_id = '',
      trainer_id = '',
      first_name = '',
      age = '',
      email = '',
      phone_number = '',
    } = req?.body

    if (!(gym_id && trainer_id && first_name && age && email && phone_number)) {
      await t.rollback()
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      await t.rollback()
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    let traineeData = await trainee.createTrainee({ ...req.body, }, t,)

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

    console.log(userData, "ddddddddddd")

    await trainee.updateTrainee(traineeData.id, { user_id: userData.id }, t,)

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
    return responseHandler.error(res, 500, "", error.message,)
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

exports.traineeUpdatePhone = async (req, res) => {
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

exports.traineeUpdateEmail = async (req, res) => {
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

exports.traineeUpdatePassword = async (req, res) => {
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
