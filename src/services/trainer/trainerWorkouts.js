const db = require("../../models")
const { where } = require('sequelize');
const TraineeWorkoutPlan = db.sequelize.model('trainee_workout_plans')
const TraineeWorkout = db.sequelize.model('trainee_workouts')

// =======>>> Workout by Trainer for Trainee
exports.getTraineeWorkout = async () => {

}

exports.createTraineeWorkout = async (data, t) => {
  return TraineeWorkout.create(data, { transaction: t })
}

exports.updateTraineeWorkout = async (id, data, t) => {
  return TraineeWorkout.update(data, { where: { workout_plan_id: id }, transaction: t })
}

exports.deleteTraineeWorkout = async (id, t) => {
  return TraineeWorkout.update({ deleted: true }, { where: { workout_plan_id: id }, transaction: t })
}

exports.getTraineeWorkoutPlanById = async (id, t) => {
  return TraineeWorkoutPlan.findOne({ where: { id, }, transaction: t })
}

exports.createTraineeWorkoutPlan = async (data, t) => {
  return TraineeWorkoutPlan.create(data, { transaction: t })
}

exports.updateTraineeWorkoutPlan = async (id, data, t,) => {
  return TraineeWorkoutPlan.update(data, { where: { id }, transaction: t })
}

exports.deleteTraineeWorkoutPlan = async (id, t) => {
  return TraineeWorkoutPlan.update({ deleted: true }, { where: { id }, transaction: t })
}