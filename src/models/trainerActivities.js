const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const TrainerActivities = sequelize.define("TrainerActivities", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  trainerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = TrainerActivities
