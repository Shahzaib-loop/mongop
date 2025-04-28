// const User = require("./unifiedUsers")
// const RefreshToken = require("./refreshTokens")
// const AdminActivities = require("./adminActivities")
// const GymActivities = require("./gymActivities")
// const TrainerActivities = require("./trainerActivities")
// const TraineeActivities = require("./traineeActivities")
// const Admins = require("./admin")
// const GymOwner = require("./gymOwners")
// const Gym = require("./gym")
// const Trainer = require("./trainer")
// const Trainee = require("./trainee")
// const TraineeWorkoutPlan = require("./traineeWorkoutPlans")
// const TraineeWorkoutDay = require("./traineeWorkoutDay")
// const TraineeWorkoutExercise = require("./traineeWorkoutExercise")
// const TraineeExerciseProgress = require("./traineeExerciseProgress")
// const TrainerNotes = require("./trainerNotes")
// const TraineeNotes = require("./traineeNotes")

const db = require("./index")
const User = db.unified_users
const Gym = db.gyms
const GymOwner = db.gym_owners
const Trainee = db.trainees
const Trainer = db.trainers

console.log(db)

//  ==== User ============================================================
Gym.hasOne(User, { foreignKey: 'linked_id', as: 'gym_user', constraints: false, })
User.belongsTo(Gym, { foreignKey: 'linked_id', constraints: false, })

Trainer.hasOne(User, { foreignKey: 'linked_id', constraints: false, })
User.belongsTo(Trainer, { foreignKey: 'linked_id', constraints: false, })

Trainee.hasOne(User, { foreignKey: 'linked_id', constraints: false, })
User.belongsTo(Trainee, { foreignKey: 'linked_id', constraints: false, })


//  ==== Refresh Token ============================================================
// User.hasOne(RefreshToken, { foreignKey: 'user_id' })
// RefreshToken.belongsTo(User, { foreignKey: 'user_id' })


//  ==== Activities ============================================================
// Admin.hasMany(Admin_activities, { foreignKey: 'adminId' })
// Admin_activities.belongsTo(Admin, { foreignKey: 'adminId' })

// Gym.hasMany(Gym_activities, { foreignKey: 'gym_id', as: 'gymActivities' })
// Gym_activities.belongsTo(Gym, { foreignKey: 'gym_id' })

// Trainer.hasMany(Trainer_activities, { foreignKey: 'trainer_id' })
// Trainer_activities.belongsTo(Trainer, { foreignKey: 'trainer_id' })

// Trainee.hasMany(Trainee_activities, { foreignKey: 'trainee_id' })
// Trainee_activities.belongsTo(Trainee, { foreignKey: 'trainee_id' })

//  ==== Admin ============================================================


//  ==== Gym ============================================================
Gym.hasMany(GymOwner, { foreignKey: 'gym_id', as: 'owners' })
GymOwner.belongsTo(Gym, { foreignKey: 'gym_id' })

Gym.hasMany(Trainer, { foreignKey: 'gym_id', as: 'trainers' })
Trainer.belongsTo(Gym, { foreignKey: 'gym_id' })

Gym.hasMany(Trainee, { foreignKey: 'gym_id' })
Trainee.belongsTo(Gym, { foreignKey: 'gym_id' })

// Gym.hasMany(TraineeWorkoutPlan, { foreignKey: 'gym_id' })
// TraineeWorkoutPlan.belongsTo(Gym, { foreignKey: 'gym_id' })


//  ==== Trainers ============================================================
Trainer.hasMany(Trainee, { foreignKey: 'trainer_id', as: 'trainees' })
Trainee.belongsTo(Trainer, { foreignKey: 'trainer_id', })

// Trainer.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainer_id' })
// TraineeWorkoutPlan.belongsTo(Trainer, { foreignKey: 'trainer_id' })


//  ==== Trainees ============================================================
// Trainee.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainee_id' })
// TraineeWorkoutPlan.belongsTo(Trainee, { foreignKey: 'trainee_id' })

// Trainee.hasMany(TraineeExerciseProgress, { foreignKey: 'trainee_id' })
// TraineeExerciseProgress.belongsTo(Trainee, { foreignKey: 'trainee_id' })

//  ==== Workout ============================================================
// TraineeWorkoutPlan.hasMany(TraineeWorkoutDay, { foreignKey: 'workout_plan_id' })
// TraineeWorkoutDay.belongsTo(TraineeWorkoutPlan, { foreignKey: 'workout_plan_id' })


//  ==== Workout Day ============================================================
// TraineeWorkoutDay.hasMany(TraineeWorkoutPlan, { foreignKey: 'workout_day_id' })
// TraineeWorkoutPlan.belongsTo(TraineeWorkoutDay, { foreignKey: 'workout_day_id' })


//  ==== Workout Exercise ============================================================
// TraineeWorkoutExercise.hasMany(TraineeExerciseProgress, { foreignKey: 'workout_exercise_id' })
// TraineeExerciseProgress.belongsTo(TraineeWorkoutExercise, { foreignKey: 'workout_exercise_id' })


//  ==== Notes ============================================================


// module.exports = (db) => {
//   const {
//     Admins,
//     RefreshToken,
//     AdminActivities,
//     GymActivities,
//     TrainerActivities,
//     TraineeActivities,
//     TraineeWorkoutPlan,
//     TraineeWorkoutDay,
//     TraineeWorkoutExercise,
//     TraineeExerciseProgress,
//     TrainerNotes,
//     TraineeNotes,
//   } = db
//
//   const User = db.unified_users
//   const Gym = db.gyms
//   const GymOwner = db.gym_owners
//   const Trainee = db.trainees
//   const Trainer = db.trainers
//
//   console.log(db.gyms, "gggggggggg")
//   console.log(Gym, "gggggggggg")
//
// //  ==== User ============================================================
//   Gym.hasOne(User, { foreignKey: 'linked_id', as: 'gym_user', constraints: false, })
//   User.belongsTo(Gym, { foreignKey: 'linked_id', constraints: false, })
//
//   Trainer.hasOne(User, { foreignKey: 'linked_id', constraints: false, })
//   User.belongsTo(Trainer, { foreignKey: 'linked_id', constraints: false, })
//
//   Trainee.hasOne(User, { foreignKey: 'linked_id', constraints: false, })
//   User.belongsTo(Trainee, { foreignKey: 'linked_id', constraints: false, })
//
//
// //  ==== Refresh Token ============================================================
// // User.hasOne(RefreshToken, { foreignKey: 'user_id' })
// // RefreshToken.belongsTo(User, { foreignKey: 'user_id' })
//
//
// //  ==== Activities ============================================================
// // Admin.hasMany(Admin_activities, { foreignKey: 'adminId' })
// // Admin_activities.belongsTo(Admin, { foreignKey: 'adminId' })
//
// // Gym.hasMany(Gym_activities, { foreignKey: 'gym_id', as: 'gymActivities' })
// // Gym_activities.belongsTo(Gym, { foreignKey: 'gym_id' })
//
// // Trainer.hasMany(Trainer_activities, { foreignKey: 'trainer_id' })
// // Trainer_activities.belongsTo(Trainer, { foreignKey: 'trainer_id' })
//
// // Trainee.hasMany(Trainee_activities, { foreignKey: 'trainee_id' })
// // Trainee_activities.belongsTo(Trainee, { foreignKey: 'trainee_id' })
//
// //  ==== Admin ============================================================
//
//
// //  ==== Gym ============================================================
//   Gym.hasMany(GymOwner, { foreignKey: 'gym_id', as: 'owners' })
//   GymOwner.belongsTo(Gym, { foreignKey: 'gym_id' })
// //
// //   Gym.hasMany(Trainer, { foreignKey: 'gym_id', as: 'trainers' })
// //   Trainer.belongsTo(Gym, { foreignKey: 'gym_id' })
//
// //   Gym.hasMany(TraineeWorkoutPlan, { foreignKey: 'gym_id' })
// //   TraineeWorkoutPlan.belongsTo(Gym, { foreignKey: 'gym_id' })
//
//
// //  ==== Trainers ============================================================
// //   Trainer.hasMany(Trainee, { foreignKey: 'trainer_id', as: 'trainees' })
// //   Trainee.belongsTo(Trainer, { foreignKey: 'trainer_id', })
//
// //   Trainer.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainer_id' })
// //   TraineeWorkoutPlan.belongsTo(Trainer, { foreignKey: 'trainer_id' })
//
//
// //  ==== Trainees ============================================================
// // Trainee.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainee_id' })
// // TraineeWorkoutPlan.belongsTo(Trainee, { foreignKey: 'trainee_id' })
//
// // Trainee.hasMany(TraineeExerciseProgress, { foreignKey: 'trainee_id' })
// // TraineeExerciseProgress.belongsTo(Trainee, { foreignKey: 'trainee_id' })
//
// //  ==== Workout ============================================================
// // TraineeWorkoutPlan.hasMany(TraineeWorkoutDay, { foreignKey: 'workout_plan_id' })
// // TraineeWorkoutDay.belongsTo(TraineeWorkoutPlan, { foreignKey: 'workout_plan_id' })
//
//
// //  ==== Workout Day ============================================================
// // TraineeWorkoutDay.hasMany(TraineeWorkoutPlan, { foreignKey: 'workout_day_id' })
// // TraineeWorkoutPlan.belongsTo(TraineeWorkoutDay, { foreignKey: 'workout_day_id' })
//
//
// //  ==== Workout Exercise ============================================================
// // TraineeWorkoutExercise.hasMany(TraineeExerciseProgress, { foreignKey: 'workout_exercise_id' })
// // TraineeExerciseProgress.belongsTo(TraineeWorkoutExercise, { foreignKey: 'workout_exercise_id' })
//
//
// //  ==== Notes ============================================================
//
// }