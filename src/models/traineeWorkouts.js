const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const TraineeWorkouts = sequelize.define("TraineeWorkouts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  workoutId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
})

module.exports = TraineeWorkouts
