const db = require('../../models');
const Trainer = db.sequelize.model('trainers')

exports.getGymTrainer = async (gym_id) => {
  return Trainer.findOne({
    where: { gym_id },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}

exports.getAllGymTrainers = async (gym_id) => {
  return Trainer.findAll({
    where: { gym_id },
    // include: {
    //   model: TrainerActivities,
    // }
  })
}
