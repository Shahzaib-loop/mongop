// const { DataTypes } = require("sequelize")
// const { sequelize } = require("../config/db")
//
// const gym_activities = sequelize.define("gym_activities", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   gym_id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   action: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   activity: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// },
//   {
//     timestamps: true
//   }
// )
//
// module.exports = gym_activities
