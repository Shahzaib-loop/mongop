module.exports = (sequelize, DataTypes) => {
  const TraineeProgress = sequelize.define("trainee_progress", {
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
      // date: {
      //   type: DataTypes.DATE
      // },
      // completed_sets: {
      //   type: DataTypes.INTEGER,
      // },
      // completed_reps: {
      //   type: DataTypes.INTEGER,
      // },
      // feedback: {
      //   type: DataTypes.STRING,
      // },
      // deleted: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
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
  return TraineeProgress
}
