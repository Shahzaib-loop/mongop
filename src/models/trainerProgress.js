// const { sequelize } = require("../config/db")
// const { DataTypes } = require("sequelize")
//
// const trainer_progress = sequelize.define("trainer_progress", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   trainee_id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATE
//   },
//   completed_sets: {
//     type: DataTypes.INTEGER,
//   },
//   completed_seps: {
//     type: DataTypes.INTEGER,
//   },
//   feedback: {
//     type: DataTypes.STRING,
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
// module.exports = trainer_progress
