const Admin = require("./admin")
const AdminActivities = require("./adminActivities")
const Gym = require("./gym")
const GymActivities = require("./gymActivities")
const Trainer = require("./trainer")
const TrainerActivities = require("./trainerActivities")
const TrainerNotes = require("./trainerNotes")
const Trainee = require("./trainee")
const TraineeActivities = require("./traineeActivities")
const TraineeNotes = require("./traineeNotes")
const TraineeWorkouts = require("./traineeWorkouts")

//  ==== Admin ============================================================
Admin.hasMany(AdminActivities, { foreignKey: 'adminId' })
AdminActivities.belongsTo(Admin, { foreignKey: 'adminId' })

//  ==== Gym ============================================================
Gym.hasMany(GymActivities, { foreignKey: 'gymId', as: 'gymActivities' })
GymActivities.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Trainer, { foreignKey: 'gymId', as: 'gymTrainer' })
Trainer.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Trainee, { foreignKey: 'gymId', as: 'gymTrainee' })
Trainee.belongsTo(Gym, { foreignKey: 'gymId' })

//  ==== Trainer ============================================================
Trainer.hasMany(TrainerActivities, { foreignKey: 'trainerId' })
TrainerActivities.belongsTo(Trainer, { foreignKey: 'trainerId' })

Trainer.hasMany(Trainee, { foreignKey: 'trainerId' })
Trainee.belongsTo(Trainer, { foreignKey: 'trainerId' })

//  ==== Trainee ============================================================
Trainee.hasMany(TraineeActivities, { foreignKey: 'traineeId' })
TraineeActivities.belongsTo(Trainee, { foreignKey: 'traineeId' })

Trainee.hasMany(TraineeWorkouts, { foreignKey: 'traineeId', as: 'traineeWorkouts' })
TraineeWorkouts.belongsTo(Trainee, { foreignKey: 'traineeId', as: 'traineeWorkouts' })

//  ==== Workout ============================================================
TraineeWorkouts.hasMany(TrainerNotes, { foreignKey: 'workoutId', as: 'trainerNotes' })
TrainerNotes.belongsTo(TraineeWorkouts, { foreignKey: 'workoutId', as: 'trainerNotes' })

TraineeWorkouts.hasMany(TraineeNotes, { foreignKey: 'workoutId', as: 'traineeNotes' })
TraineeNotes.belongsTo(TraineeWorkouts, { foreignKey: 'workoutId', as: 'traineeNotes' })

