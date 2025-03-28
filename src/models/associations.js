const Admin = require("./admin")
const AdminActivities = require("./adminActivities")
const Gym = require("./gym")
const GymActivities = require("./gymActivities")
const Trainer = require("./trainer")
const TrainerActivities = require("./trainerActivities")
const Trainee = require("./trainee")
const TraineeActivities = require("./traineeActivities")

//  ==== Admin ============================================================
Admin.hasMany(AdminActivities, { foreignKey: 'adminId' })
AdminActivities.belongsTo(Admin, { foreignKey: 'adminId' })

//  ==== Gym Admin ============================================================
// GymAdmin.hasMany(GymAdminActivities, { foreignKey: 'gymAdminId' })
// GymAdminActivities.belongsTo(GymAdmin, { foreignKey: 'gymAdminId' })

//  ==== Gym ============================================================
Gym.hasMany(GymActivities, { foreignKey: 'gymId' })
GymActivities.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Trainer, { foreignKey: 'gymId' })
Trainer.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Trainee, { foreignKey: 'gymId' })
Trainee.belongsTo(Gym, { foreignKey: 'gymId' })

//  ==== Trainer ============================================================
Trainer.hasMany(TrainerActivities, { foreignKey: 'trainerId' })
TrainerActivities.belongsTo(Trainer, { foreignKey: 'TrainerId' })

Trainer.hasMany(Trainee, { foreignKey: 'trainerId' })
Trainee.belongsTo(Trainer, { foreignKey: 'trainerId' })

//  ==== Trainee ============================================================
Trainee.hasMany(TraineeActivities, { foreignKey: 'traineeId' })
TraineeActivities.belongsTo(Trainee, { foreignKey: 'TraineeId' })