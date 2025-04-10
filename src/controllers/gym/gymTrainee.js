const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require('../../utils/uniqueCheck')
const { addActivity } = require('../../utils/activities')
const Trainee = db.sequelize.model('trainees')
// const GymActivities = db.sequelize.model('gym_activities')
// const TraineeActivities = db.sequelize.model('trainee_activities')
const { createTrainee, } = require('../../services/trainee/trainee')
const { getGymTrainer, } = require('../../services/gym/gym')
const bcrypt = require('bcryptjs');

const addGymTrainee = async (req, res) => {
  try {
    //  abhi ke liye gym directly trainee add ni kr sakta usko default trainer se
    //  login krke trainee ko manage krna hoga

    // jab gym create ho to ek default trainer us gym ka bn jay
    // jab gym directly trainee add kray to default wala trainer lag jay
    // or agr trainer koi trainee add kray ga to wo us trainer ke under ay ga

    const { id = '', } = req?.params
    const { firstName = '', lastName = '', email = '', number = '', } = req?.body

    console.log(req.body)

    if (!(id && firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainerData = await getGymTrainer(id)

    console.log(trainerData, "rrrrrrrrrr trainerDatatrainerDatatrainerData")

    const tempPassword = 'tester'
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    let trainee = await createTrainee({ ...req.body, gymId: id, trainerId: trainerData.id, password: hashedPassword })

    if (!(Object.keys(trainee).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    // await addActivity(
    //   GymActivities,
    //   'gymId',
    //   id,
    //   "GYM_ADDED_TRAINEE",
    //   "gym added trainee"
    // )
    // await addActivity(
    //   TraineeActivities,
    //   'traineeId',
    //   trainee.id,
    //   "TRAINEE_CREATED_BY_GYM",
    //   "trainee created by gym"
    // )

    responseHandler.success(res, "Trainee Created Successfully", trainee)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const updateGymTrainee = async (data) => {
}

const deleteGymTrainee = async (data) => {
}

module.exports = {
  addGymTrainee,
  updateGymTrainee,
  deleteGymTrainee,
}