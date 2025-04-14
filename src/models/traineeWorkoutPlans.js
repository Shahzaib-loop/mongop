// const { sequelize } = require("../config/db")
// const { DataTypes } = require("sequelize")
//
// const trainee_workout_plans = sequelize.define("trainee_workout_plans", {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },
//     gym_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     trainer_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     trainee_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING
//     },
//     description: {
//       type: DataTypes.TEXT
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
// module.exports = trainee_workout_plans
