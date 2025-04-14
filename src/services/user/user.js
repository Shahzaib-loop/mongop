const db = require('../../models');
const User = db.sequelize.model('unified_user_data')

exports.createUser = async (data, t) => {
  return await User.create(data, { transaction: t })
}
