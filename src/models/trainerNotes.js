// const { DataTypes } = require("sequelize")
// const { sequelize } = require("../config/db")
//
// const trainer_notes = sequelize.define("trainer_notes", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   trainerId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   workoutId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   description: {
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
// })
//
// module.exports = trainer_notes
