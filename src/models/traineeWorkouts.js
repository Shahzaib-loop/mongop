const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const trainee_workouts = sequelize.define("trainee_workouts", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // note_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    workout_plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    // exercise_type_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    focus_area: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true
  }
)

module.exports = trainee_workouts
