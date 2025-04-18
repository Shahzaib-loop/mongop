const db = require('../../models')
const bcrypt = require('bcryptjs')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require('../../utils/uniqueCheck')
const { addActivity } = require('../../utils/activities')
const Trainee = db.sequelize.model('trainees')
const gym = require('../../services/gym/gym')
const trainer = require('../../services/trainer/trainer')
const trainee = require('../../services/trainee/trainee')
// const GymActivities = db.sequelize.model('gym_activities')
// const TraineeActivities = db.sequelize.model('trainee_activities')

//  ============================================================================
//  abhi ke liye gym directly trainee add ni kr sakta usko default trainer se
//  login krke trainee ko manage krna hoga

// jab gym create ho to ek default trainer us gym ka bn jay
// jab gym directly trainee add kray to default wala trainer lag jay
// or agr trainer koi trainee add kray ga to wo us trainer ke under ay ga

exports.addGymTrainee = async (req, res) => {
  const t = await db.sequelize.transaction()
  const tempPassword = 'Trainer1234'

  try {
    const {
      gym_id = '',
      firstName = '',
      email = '',
      number = '',
    } = req?.body

    if (!(gym_id && firstName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainerData = await trainer.getAllTrainerByGymId(gym_id)

    console.log(trainerData, "rrrrrrrrrr trainerDatatrainerDatatrainerData")

    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    let trainee = await trainee.createTrainee({
      ...req.body,
      gym_id,
      trainer_id: trainerData.id,
      password: hashedPassword
    })

    if (!(Object.keys(trainee).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    // await addActivity(
    //   GymActivities,
    //   'gym_id',
    //   id,
    //   "GYM_ADDED_TRAINEE",
    //   "gym added trainee"
    // )
    // await addActivity(
    //   TraineeActivities,
    //   'trainee_id',
    //   trainee.id,
    //   "TRAINEE_CREATED_BY_GYM",
    //   "trainee created by gym"
    // )

    return responseHandler.success(res, "Trainee Created Successfully", trainee)
  }
  catch (error) {
    return responseHandler.error(res, 500, "", error.message,)
  }
}

exports.updateGymTrainee = async (data) => {
}

exports.deleteGymTrainee = async (data) => {
}
