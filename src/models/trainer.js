module.exports = (sequelize, DataTypes) => {
  const Trainer = sequelize.define("trainers",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      gym_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      trainer_type: {
        type: DataTypes.STRING,
        defaultValue: "non_default",
      },
      bio: {
        type: DataTypes.TEXT,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      gender: {
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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
        },
      },
      specialties: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience_years: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      start_time: {
        type: DataTypes.INTEGER,
      },
      end_time: {
        type: DataTypes.INTEGER,
      },
      medical_conditions: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'none',
      },
      total_sessions: {
        type: DataTypes.INTEGER,
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
  return Trainer
}