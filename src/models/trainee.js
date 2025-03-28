const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const Trainee = sequelize.define("Trainee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
  gymId: {
    type: DataTypes.UUID,
    allowNull: false,
    // references: {
    //   model: Gym,
    //   key: 'id',
    // },
  },
  trainerId: {
    type: DataTypes.UUID,
    allowNull: false,
    // references: {
    //   model: Trainer,
    //   key: 'id',
    // },
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

module.exports = Trainee
