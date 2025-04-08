const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require('../../utils/responseHandler')
const { uniqueCheck } = require("../../utils/uniqueCheck")
const { addActivity } = require("../../utils/activities")
const Trainer = db.sequelize.model('Trainer')
const TrainerActivities = db.sequelize.model('TrainerActivities')
const {
  createTrainer,
  loginTrainer,
  logoutTrainer,
  getTrainers,
  getTrainer,
  getTrainerActivities,
  updateTrainer,
  deleteTrainer,
  restoreTrainer,
  getTraineeWorkout,
  createTraineeWorkout,
  updateTraineeWorkout,
  deleteTraineeWorkout,
  getTrainerNote,
  createTrainerNote,
  updateTrainerNote,
  deleteTrainerNote,
} = require("../../services/trainer")

const trainerLogin = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body

    if (!(email && password)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    const resp = await loginTrainer({ email, password })

    if (!(Object.keys(resp).length > 0)) {
      return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
    }

    responseHandler.success(res, "Gym Login successfully", resp)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerLogout = async (req, res) => {
  try {
    const tokens = await logoutTrainer(req.body)

    responseHandler.success(res, "Trainer Logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerActivities = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getTrainerActivities(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainersData = async (req, res) => {
  try {
    const data = await getTrainers()

    responseHandler.success(res, "Trainees Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerData = async (req, res) => {
  try {
    const { id = '' } = req.params

    const data = await getTrainer(id)

    responseHandler.success(res, "Trainer Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerCreate = async (req, res) => {
  try {
    const tempPassword = 'tester123'
    const {
      firstName = '',
      lastName = '',
      email = '',
      number = '',
      password = '',
    } = req?.body

    if (!(firstName && lastName && email && number && password)) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "required fields are empty or invalid")
    }

    let isExisting = await uniqueCheck(Trainer, req.body, "Trainee",)

    if (isExisting?.reason) {
      return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
    }

    let trainer = await createTrainer({ ...req.body, password: password ? password : tempPassword })
    trainer = await trainer.toJSON()

    await addActivity(TrainerActivities, trainer?.id, "TRAINER_CREATED", "trainer registered")

    responseHandler.created(res, "Trainer registered successfully", trainer)
  }
  catch (error) {
    logger.error(`${ error }`)
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerUpdate = async (req, res) => {
  try {
    const { id = '' } = req?.params
    const { number, email, password, ...rest } = req?.body

    await updateTrainer(id, rest)

    await addActivity(TrainerActivities, id, "TRAINER_UPDATED", "trainer updated")

    responseHandler.success(res, "Trainer Updated successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerDelete = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await deleteTrainer(id)

    await addActivity(TrainerActivities, id, "TRAINER_DELETED", "trainer deleted")

    responseHandler.success(res, "Trainer Deleted successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, "", error.message,)
  }
}

const trainerRestore = async (req, res) => {
  try {
    const { id = '', } = req?.params

    if (!id) {
      return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
    }

    await restoreTrainer(id)

    await addActivity(TrainerActivities, id, "TRAINER_RESTORED", "trainer restored")

    responseHandler.success(res, "Trainer Restored successfully")
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

// =======>>> Workout for Trainee by Trainer
const traineeWorkoutData = async (req, res) => {
}

const traineeWorkoutCreate = async (req, res) => {
}

const traineeWorkoutUpdate = async (req, res) => {
}

const traineeWorkoutDelete = async (req, res) => {
}

// =======>>> Trainer Notes
const trainerNoteData = async (req, res) => {
  try {
    // iski zarorat shayad na paray kunke jab workout get hoon gat to join se ye notes sath ain gay hr workout ke

    const { id } = req.params //  workoutId

    // workoutId ke against saved note le ay ga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerNoteCreate = async (req, res) => {
  try {
    const { id } = req.params //  workoutId
    const { trainerId, description } = req.body // trainerId

    // workout ke against note save hoga or traineeId params se mil rhi hogi as traineeNotes
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerNoteUpdate = async (req, res) => {
  try {
    const { id } = req.params //  noteId
    const { trainerId, ...rest } = req.body // trainerId remove krni ha, cant be updated

    // noteId ke against note save hoga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

const trainerNoteDelete = async (req, res) => {
  try {
    const { id } = req.params //  noteId

    // noteId ke against note delete hoga
  }
  catch (error) {
    responseHandler.error(res, 500, error.message, "")
  }
}

module.exports = {
  trainerCreate,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerActivities,
  trainerUpdate,
  trainerDelete,
  trainerRestore,

  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,

  trainerNoteData,
  trainerNoteCreate,
  trainerNoteUpdate,
  trainerNoteDelete,
}
