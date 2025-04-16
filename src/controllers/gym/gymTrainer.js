const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const bcrypt = require('bcryptjs');
const Trainer = db.sequelize.model('trainers')
// const GymActivities = db.sequelize.model('gym_activities')
// const TrainerActivities = db.sequelize.model('trainer_activities')
const { uniqueCheck } = require('../../utils/uniqueCheck')
const { addActivity } = require('../../utils/activities')
const user = require('../../services/user/user')
const trainer = require('../../services/trainer/trainer')

exports.addGymTrainer = async (req, res) => {
  const t = await db.sequelize.transaction()
  const tempPassword = 'Trainer1234'

  try {
    const { id: gym_id = '', } = req?.params
    const { first_name = '', last_name = '', email = '', phone_number = '', } = req?.body

    if (!(gym_id && first_name && last_name && email && phone_number)) {
      await t.rollback()
      return responseHandler.unauthorized(res, "Invalid Data", "data is not correct")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "Trainer",)

    if (isExisting?.reason) {
      await t.rollback()
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    const trainerData = await trainer.createTrainer({ ...req.body, gym_id, trainerType: 'non_default', }, t,)

    if (!trainerData?.id) {
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

exports.updateGymTrainer = async (req, res) => {
  try {
    const { id = '' } = req.params
    const { first_name = '', last_name = '', email = '', phone_number = '' } = req.body

  }
  catch (e) {

  }
}

exports.deleteGymTrainer = async (req, res) => {
}
