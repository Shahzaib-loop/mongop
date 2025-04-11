// const { DataTypes } = require("sequelize")
// const { sequelize } = require("../config/db")
//
// const admin_activities = sequelize.define("admin_activities", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   adminId: {
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
// module.exports = admin_activities
