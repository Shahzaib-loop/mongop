const db = require("../models")
const bcrypt = require("bcryptjs")
const { generateTokens } = require('../utils/auth')
const Admin = db.sequelize.model('Admin');

const createAdmin = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  let user = await Admin.create({ ...data, password: hashedPassword })

  console.log(user, "2222 dataaaaaaaaaaaaa")

  return user
}

const loginAdmin = async ({ email = '', password = '' }) => {
  const admin = await Admin.findOne({ where: { email }, raw: true })

  if (!(Object.keys(admin).length > 0)) return false

  const isMatch = await bcrypt.compare(password, admin.password)

  if (!isMatch) return false

  const tokens = generateTokens(admin)

  if (!(Object.keys(tokens).length > 0)) return false

  return { admin, tokens }
}

const logoutAdmin = async (email = '') => {
  return email
}

const getAdmins = async () => {
  return Admin.findAll()
}

const getAdmin = async (id) => {
  return Admin.findOne({ where: { id } })
}

const updateAdmin = async (id, data) => {
  return Admin.update(data, { where: { id } })
}

const deleteAdmin = async () => {
  return Admin.update({ deleted: true }, { where: { id } })
}

const restoreAdmin = async (id) => {
  return Admin.update({ deleted: false }, { where: { id } })
}

module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  restoreAdmin,
}
