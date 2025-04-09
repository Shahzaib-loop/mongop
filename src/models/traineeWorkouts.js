const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const trainee_workout_plans = sequelize.define("trainee_workout_plans", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  trainerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  traineeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  exerciseType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.STRING,
  },
  warmupTime: {
    type: DataTypes.INTEGER,
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

module.exports = trainee_workout_plans
