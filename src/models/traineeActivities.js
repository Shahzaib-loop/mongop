module.exports = (sequelize, DataTypes) => {
  const TraineeActivities = sequelize.define("trainee_activities", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // trainee_id: {
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
  return TraineeActivities
}
