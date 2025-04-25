module.exports = (sequelize, DataTypes) => {
  const RefreshTokens = sequelize.define('refresh_tokens', {
      // token: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // },
      // expiry: {
      //   type: DataTypes.DATE,
      //   allowNull: false
      // }
    },
    {
      timestamps: true
    }
  )
  return RefreshTokens
}
