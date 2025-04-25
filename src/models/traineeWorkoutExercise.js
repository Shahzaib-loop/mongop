module.exports = (sequelize, DataTypes) => {
  const TraineeWorkoutExercise = sequelize.define("trainee_workout_exercise", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // workout_day_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      // },
      // name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // sets: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // reps: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // weight: {
      //   type: DataTypes.DECIMAL,
      //   allowNull: false,
      // },
      // position: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // machine_used: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
      // warmup_time: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // rest_time: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // note_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
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
  return TraineeWorkoutExercise
}
