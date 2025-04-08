const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const TraineeNotes = sequelize.define("TraineeNotes", {
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
  traineeId: {
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

module.exports = TraineeNotes
