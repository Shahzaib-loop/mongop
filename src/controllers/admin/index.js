const db = require('../../models')
const logger = require("../../utils/logger")
const responseHandler = require("../../utils/responseHandler")
const { uniqueCheck } = require("../../utils/uniqueCheck")
const Admin = db.sequelize.model('Admin')
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../../services/admin")

const adminRegister = async (req, res) => {
  try {
    const { firstName = '', lastName = '', email = '', number = '', password = '' } = req.body

    if (!(firstName && lastName && email && number && password)) {
      return responseHandler.error(res, 500, "Required fields are invalid", "required fields are empty or invalid")
    }

    console.log(req.body,'user 000000 lllllllllllllllll')

    let userCheck = await uniqueCheck(Admin, req.body, "Admin", "email")

    console.log(userCheck, 'user 111111 lllllllllllllllll')

    if (userCheck?.reason) {
      return responseHandler.error(res, 409, userCheck.message, userCheck.reason)
    }

    const user = await registerAdmin(req.body)

    console.log(user, 'user 222222 lllllllllllllllll')

    return responseHandler.created(res, "Admin registered successfully", user)
  }
  catch (error) {
    logger.error(`${ error }`)
    return responseHandler.error(res, 500, "Error while registering Admin", error?.message,)
  }
}

const adminLogin = async (req, res) => {
  try {
    const tokens = await loginAdmin(req.body)

    responseHandler.success(res, "Admin login successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const adminLogout = async (req, res) => {
  try {
    const tokens = await logoutAdmin(req.body)

    responseHandler.success(res, "Admin logout successfully", tokens)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const adminsData = async (req, res) => {
  try {
    const data = await getAdmins()

    responseHandler.success(res, "Admins Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const adminData = async (req, res) => {
  try {
    const data = await getAdmin()

    responseHandler.success(res, "Admin Data Fetched successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const adminUpdate = async (req, res) => {
  try {
    const data = await updateAdmin()

    responseHandler.success(res, "Admins Updated successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

const adminDelete = async (req, res) => {
  try {
    const data = await deleteAdmin()

    responseHandler.success(res, "Admins Deleted successfully", data)
  }
  catch (error) {
    responseHandler.error(res, 400, "", error.message,)
  }
}

module.exports = {
  adminRegister,
  adminLogin,
  adminLogout,
  adminsData,
  adminData,
  adminUpdate,
  adminDelete,
}
