const db = require("../../models")
const Trainer = db.sequelize.model('trainers')
const Trainee = db.sequelize.model('trainees')
// const TraineeActivities = db.sequelize.model('trainee_activities')
// const TraineeNotes = db.sequelize.model('trainee_notes')

// =======>>> Trainer handling Trainee
const getTrainerTrainee = async (trainerId) => {
  return Trainee.findAll(
    {
      where: { trainerId, deleted: false, },
      include: [
        // {
        //   model: TraineeActivities,
        //   as: "activities",
        // },
        // {
        //   model: TraineeNotes,
        //   as: "notes",
        // },
      ]
    }
  )
}

const updateTrainerTrainee = async (id, data) => {
  return Trainee.update(data, { where: { id } })
}

module.exports = {
  getTrainerTrainee,
  updateTrainerTrainee,
}