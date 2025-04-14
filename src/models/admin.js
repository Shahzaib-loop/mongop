// const { DataTypes } = require("sequelize")
// const { sequelize } = require("../config/db")
//
// const admins = sequelize.define("admins", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   last_name: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,
//     },
//   },
//   deleted: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
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
// module.exports = admins
