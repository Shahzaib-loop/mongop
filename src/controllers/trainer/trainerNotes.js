const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { addActivity } = require("../../utils/activities")
// const TrainerActivities = db.sequelize.model('trainer_activities')
const trainerNotes = require("../../services/trainer/trainerNotes")

exports.trainerNoteData = async (req, res) => {
  try {
    // iski zarorat shayad na paray kunke jab workout get hoon gat to join se ye notes sath ain gay hr workout ke

    const { id } = req?.params //  workoutId

    // workoutId ke against saved note le ay ga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerNoteCreate = async (req, res) => {
  try {
    const { id } = req?.params //  workoutId
    const { trainer_id, description } = req?.body // trainer_id

    // workout ke against note save hoga or trainee_id params se mil rhi hogi as traineeNotes
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerNoteUpdate = async (req, res) => {
  try {
    const { id } = req?.params //  noteId
    const { trainer_id, ...rest } = req?.body // trainer_id remove krni ha, cant be updated

    // noteId ke against note save hoga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

exports.trainerNoteDelete = async (req, res) => {
  try {
    const { id } = req?.params //  noteId

    // noteId ke against note delete hoga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}
