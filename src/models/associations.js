const admins = require("./admin")
const admin_activities = require("./adminActivities")
const gyms = require("./gym")
const gym_activities = require("./gymActivities")
const trainers = require("./trainer")
const trainer_activities = require("./trainerActivities")
const trainer_notes = require("./trainerNotes")
const trainees = require("./trainee")
const trainee_activities = require("./traineeActivities")
const trainee_notes = require("./traineeNotes")
const trainee_workout_plans = require("./traineeWorkouts")

//  ==== Admin ============================================================
admins.hasMany(admin_activities, { foreignKey: 'adminId' })
admin_activities.belongsTo(admins, { foreignKey: 'adminId' })

//  ==== gyms ============================================================
gyms.hasMany(gym_activities, { foreignKey: 'gymId', as: 'gymActivities' })
gym_activities.belongsTo(gyms, { foreignKey: 'gymId' })

gyms.hasMany(trainers, { foreignKey: 'gymId', as: 'gymTrainer' })
trainers.belongsTo(gyms, { foreignKey: 'gymId' })

gyms.hasMany(trainees, { foreignKey: 'gymId', as: 'gymTrainee' })
trainees.belongsTo(gyms, { foreignKey: 'gymId' })

//  ==== trainers ============================================================
trainers.hasMany(trainer_activities, { foreignKey: 'trainerId' })
trainer_activities.belongsTo(trainers, { foreignKey: 'trainerId' })

trainers.hasMany(trainees, { foreignKey: 'trainerId' })
trainees.belongsTo(trainers, { foreignKey: 'trainerId' })

//  ==== trainees ============================================================
trainees.hasMany(trainee_activities, { foreignKey: 'traineeId' })
trainee_activities.belongsTo(trainees, { foreignKey: 'traineeId' })

trainees.hasMany(trainee_workout_plans, { foreignKey: 'traineeId', as: 'traineeWorkouts' })
trainee_workout_plans.belongsTo(trainees, { foreignKey: 'traineeId', as: 'traineeWorkouts' })

//  ==== Workout ============================================================
trainee_workout_plans.hasMany(trainer_notes, { foreignKey: 'workoutId', as: 'trainerNotes' })
trainer_notes.belongsTo(trainee_workout_plans, { foreignKey: 'workoutId', as: 'trainerNotes' })

trainee_workout_plans.hasMany(trainee_notes, { foreignKey: 'workoutId', as: 'traineeNotes' })
trainee_notes.belongsTo(trainee_workout_plans, { foreignKey: 'workoutId', as: 'traineeNotes' })

