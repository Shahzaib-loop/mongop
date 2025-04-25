module.exports = (sequelize, DataTypes) => {
  const TraineeNotes = sequelize.define("trainee_notes", {
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
      // workout_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      // description: {
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
  return TraineeNotes
}
