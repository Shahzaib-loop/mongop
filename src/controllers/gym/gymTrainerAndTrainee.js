const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const Trainer = db.sequelize.model('Trainer')
const Trainee = db.sequelize.model('Trainee')
const TraineeActivities = db.sequelize.model('TraineeActivities')
const { uniqueCheck } = require('../../utils/uniqueCheck')
const { addActivity } = require('../../utils/activities')
const { createTrainer } = require('../../services/trainer')
const { createTrainee } = require('../../services/trainee')

const addGymTrainer = async (req, res) => {
  try {
    const { id = '', } = req?.params
    const { firstName, lastName, email, number, } = req?.body

    if (!(id && firstName && lastName && email && number)) {
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

    await addActivity(
      GymActivities,
      'gymId',
      id,
      "GYM_ADDED_TRAINER",
      "gym added trainer"
    )
    await addActivity(
      TrainerActivities,
      'trainerId',
      trainer.id,
      "TRAINER_CREATED_BY_GYM",
      "trainer created by gym"
    )

    responseHandler.success(res, "Trainer Created Successfully", trainer)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const updateGymTrainer = async (data) => {
}

const deleteGymTrainer = async (data) => {
}

const addGymTrainee = async (req, res) => {
  try {

    // jab gym create ho to ek default trainer us gym ka bn jay
    // jab gym directly trainee add kray to default wala trainer lag jay
    // or agr trainer koi trainee add kray ga to wo us trainer ke under ay ga

    const { id = '', } = req?.params
    const { firstName, lastName, email, number, } = req?.body

    if (!(id && firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainee, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    let trainee = await createTrainee({ ...req.body, gymId: id, })

    if (!(Object.keys(trainee).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    await addActivity(
      GymActivities,
      'gymId',
      id,
      "GYM_ADDED_TRAINEE",
      "gym added trainer"
    )
    await addActivity(
      TraineeActivities,
      'traineeId',
      trainee.id,
      "TRAINEE_CREATED_BY_GYM",
      "trainee created by gym"
    )

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
  addGymTrainer,
  updateGymTrainer,
  deleteGymTrainer,

  addGymTrainee,
  updateGymTrainee,
  deleteGymTrainee,
}