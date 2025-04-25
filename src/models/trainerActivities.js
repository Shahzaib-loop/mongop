module.exports = (sequelize, DataTypes) => {
  const TrainerActivities = sequelize.define("trainer_activities", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // trainer_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      // action: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // activity: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
    },
    {
      timestamps: true
    }
  )
  return TrainerActivities
}
