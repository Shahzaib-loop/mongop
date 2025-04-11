const User = require("./unifiedUserData")
const AdminActivities = require("./adminActivities")
const GymActivities = require("./gymActivities")
const TrainerActivities = require("./trainerActivities")
const TraineeActivities = require("./traineeActivities")
const Admins = require("./admin")
const Gym = require("./gym")
const Trainer = require("./trainer")
const Trainee = require("./trainee")
const TraineeWorkoutPlan = require("./traineeWorkoutPlans")
const TraineeWorkoutDay = require("./traineeWorkoutDay")
const TraineeWorkoutExercise = require("./traineeWorkoutExercise")
const TraineeExerciseProgress = require("./traineeExerciseProgress")
const TrainerNotes = require("./trainerNotes")
const TraineeNotes = require("./traineeNotes")

//  ==== User ============================================================
User.hasOne(Gym, { foreignKey: 'user_id' })
User.hasOne(Trainer, { foreignKey: 'user_id' })
User.hasOne(Trainee, { foreignKey: 'user_id' })

Gym.belongsTo(User, { foreignKey: 'user_id' })
Trainer.belongsTo(User, { foreignKey: 'user_id' })
Trainee.belongsTo(User, { foreignKey: 'user_id' })

//  ==== Activities ============================================================
// Admin.hasMany(Admin_activities, { foreignKey: 'adminId' })
// Admin_activities.belongsTo(Admin, { foreignKey: 'adminId' })

// Gym.hasMany(Gym_activities, { foreignKey: 'gymId', as: 'gymActivities' })
// Gym_activities.belongsTo(Gym, { foreignKey: 'gymId' })

// Trainer.hasMany(Trainer_activities, { foreignKey: 'trainerId' })
// Trainer_activities.belongsTo(Trainer, { foreignKey: 'trainerId' })

// Trainee.hasMany(Trainee_activities, { foreignKey: 'traineeId' })
// Trainee_activities.belongsTo(Trainee, { foreignKey: 'traineeId' })

//  ==== Admin ============================================================

//  ==== Gym ============================================================

Gym.hasMany(Trainer, { foreignKey: 'gymId', as: 'trainers' })
Trainer.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Trainee, { foreignKey: 'gym_id' })
Trainee.belongsTo(Gym, { foreignKey: 'gym_id' })

Gym.hasMany(TraineeWorkoutPlan, { foreignKey: 'gym_id' })
TraineeWorkoutPlan.belongsTo(Gym, { foreignKey: 'gym_id' })

//  ==== Trainers ============================================================
Trainer.hasMany(Trainee, { foreignKey: 'trainerId', as: 'trainees' })
Trainee.belongsTo(Trainer, { foreignKey: 'trainerId', })

Trainer.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainer_id' })
TraineeWorkoutPlan.belongsTo(Trainer, { foreignKey: 'trainer_id' })

//  ==== Trainees ============================================================
Trainee.hasMany(TraineeWorkoutPlan, { foreignKey: 'trainee_id' });
TraineeWorkoutPlan.belongsTo(Trainee, { foreignKey: 'trainee_id' });

Trainee.hasMany(TraineeExerciseProgress, { foreignKey: 'trainee_id' });
TraineeExerciseProgress.belongsTo(Trainee, { foreignKey: 'trainee_id' });

//  ==== Workout ============================================================
TraineeWorkoutPlan.hasMany(TraineeWorkoutDay, { foreignKey: 'workout_plan_id' });
TraineeWorkoutDay.belongsTo(TraineeWorkoutPlan, { foreignKey: 'workout_plan_id' });

//  ==== Workout Day ============================================================

TraineeWorkoutDay.hasMany(TraineeWorkoutPlan, { foreignKey: 'workout_day_id' });
TraineeWorkoutPlan.belongsTo(TraineeWorkoutDay, { foreignKey: 'workout_day_id' });

//  ==== Workout Exercise ============================================================

TraineeWorkoutExercise.hasMany(TraineeExerciseProgress, { foreignKey: 'workout_exercise_id' });
TraineeExerciseProgress.belongsTo(TraineeWorkoutExercise, { foreignKey: 'workout_exercise_id' });

//  ==== Notes ============================================================

