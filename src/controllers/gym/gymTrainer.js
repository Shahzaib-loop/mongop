const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const bcrypt = require('bcryptjs');
const Trainer = db.sequelize.model('trainers')
// const GymActivities = db.sequelize.model('gym_activities')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const { uniqueCheck } = require('../../utils/uniqueCheck')
const { addActivity } = require('../../utils/activities')
const trainer  = require('../../services/trainer/trainer')

const addGymTrainer = async (req, res) => {
  try {
    const { id = '', } = req?.params
    const { firstName = '', lastName = '', email = '', number = '', } = req?.body

    if (!(id && firstName && lastName && email && number)) {
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "trainer",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const tempPassword = 'tester'
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    let trainerData = await trainer.createTrainer({ ...req.body, gymId: id, trainerType: 'non_default', password: hashedPassword })

    if (!(Object.keys(trainer).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    // await addActivity(
    //   GymActivities,
    //   'gymId',
    //   id,
    //   "GYM_ADDED_TRAINER",
    //   "gym added trainer"
    // )
    // await addActivity(
    //   TrainerActivities,
    //   'trainerId',
    //   trainer.id,
    //   "TRAINER_CREATED_BY_GYM",
    //   "trainer created by gym"
    // )

    responseHandler.success(res, "Trainer Created Successfully", trainerData)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const updateGymTrainer = async (data) => {
}

const deleteGymTrainer = async (data) => {
}

module.exports = {
  addGymTrainer,
  updateGymTrainer,
  deleteGymTrainer,
}