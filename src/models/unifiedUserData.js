const { sequelize } = require("../config/db")
const { DataTypes } = require("sequelize")

const unified_user_data = sequelize.define("unified_user_data", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  linked_id: {           //points to the real table like gym_id, trainer_id, etc.
    type: DataTypes.UUID,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {                //  role ENUM('admin', 'gym', 'trainer', 'trainee')
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = unified_user_data
