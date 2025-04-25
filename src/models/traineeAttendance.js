module.exports = (sequelize, DataTypes) => {
  const TraineeAttendance = sequelize.define("trainee_attendances",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      trainee_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      check_in_time: {
        type: DataTypes.INTEGER,
      },
      check_out_time: {
        type: DataTypes.INTEGER,
      },
      check_in_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      check_out_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      weight: {
        type: DataTypes.STRING,
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

  return TraineeAttendance
}