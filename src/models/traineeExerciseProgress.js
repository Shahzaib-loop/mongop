// const { sequelize } = require("../config/db")
// const { DataTypes } = require("sequelize")
//
// const trainee_exercise_progress = sequelize.define("trainee_exercise_progress", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     trainee_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     workout_exercise_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     actual_sets: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     actual_reps: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     actual_weight: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//     },
//     trainer_feedback: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     deleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     timestamps: true
//   }
// )
//
// module.exports = trainee_exercise_progress
//
