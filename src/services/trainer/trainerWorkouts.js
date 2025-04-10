const db = require("../../models")
const Trainer = db.sequelize.model('trainers')
// const trainee_workout_plans = db.sequelize.model('trainee_workout_plans')

// =======>>> Workout by Trainer for Trainee
const getTraineeWorkout = async () => {

}

const createTraineeWorkout = async (data) => {
  console.log(data, "dataaaaaaaaaaaaaa")
  // return trainee_workout_plans.create(data)
}

const updateTraineeWorkout = async (id, data) => {

}

const deleteTraineeWorkout = async (id) => {

}

module.exports = {
  getTraineeWorkout,
  createTraineeWorkout,
  updateTraineeWorkout,
  deleteTraineeWorkout,
}