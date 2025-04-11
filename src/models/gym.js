const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const gyms = sequelize.define("gyms", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "gym",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
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

module.exports = gyms
