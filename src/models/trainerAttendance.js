module.exports = (sequelize, DataTypes) => {
  const TrainerAttendances = sequelize.define("trainer_attendances",
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
        allowNull: false,
      },
      check_out_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  return TrainerAttendances
}
