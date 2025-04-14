// const { sequelize } = require("../config/db")
// const { DataTypes } = require("sequelize")
//
// const trainee_workout_day = sequelize.define("trainee_workout_day", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     workout_plan_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     note_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     day_number: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     focus_area: {
//       type: DataTypes.STRING,
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
// module.exports = trainee_workout_day
