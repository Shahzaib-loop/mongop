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

exports.addGymTrainer = async (req, res) => {
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

    let trainerData = await trainer.createTrainer({ ...req.body, gym_id: id, trainerType: 'non_default', password: hashedPassword })

    if (!(Object.keys(trainer).length > 0)) {
      responseHandler.error(res, 400, "", "",)
    }

    // await addActivity(
    //   GymActivities,
    //   'gym_id',
    //   id,
    //   "GYM_ADDED_TRAINER",
    //   "gym added trainer"
    // )
    // await addActivity(
    //   TrainerActivities,
    //   'trainer_id',
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

exports.updateGymTrainer = async (data) => {
}

exports.deleteGymTrainer = async (data) => {
}
