// const db = require('../../models')
// const logger = require("../../utils/logger")
// const responseHandler = require("../../utils/responseHandler")
// const { uniqueCheck } = require("../../utils/uniqueCheck")
// const { addActivity } = require('../../utils/activities')
// const Admin = db.sequelize.model('admins')
// const AdminActivities = db.sequelize.model('admin_activities')
// const admin = require("../../services/admin/admin")
//
// exports.adminCreate = async (req, res) => {
//   try {
//     const {
//       firstName = '',
//       lastName = '',
//       email = '',
//       number = '',
//       password = '',
//     } = req.body
//
//     if (!(firstName && lastName && email && number && password)) {
//       return responseHandler.error(res, 400, "Required fields are invalid", "required fields are empty or invalid")
//     }
//
//     console.log(req.body, 'user 000000 lllllllllllllllll')
//
//     let isExisting = await uniqueCheck(Admin, req.body, "admin")
//
//     console.log(isExisting, 'user 111111 lllllllllllllllll')
//
//     if (isExisting?.reason) {
//       return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
//     }
//
//     const user = await admin.createAdmin(req.body)
//
//     console.log(user, 'user 222222 lllllllllllllllll')
//
//     return responseHandler.created(res, "Admin registered successfully", user)
//   }
//   catch (error) {
//     logger.error(`${ error }`)
//     return responseHandler.error(res, 500, "Error while registering Admin", error?.message,)
//   }
// }
//
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email = '', password = '' } = req.body
//
//     if (!(email && password)) {
//       return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
//     }
//
//     const resp = await admin.loginAdmin({ email, password })
//
//     if (!(Object.keys(resp).length > 0)) {
//       return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
//     }
//
//     responseHandler.success(res, "Admin Login successfully", resp)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminLogout = async (req, res) => {
//   try {
//     const tokens = await admin.logoutAdmin(req.body)
//
//     responseHandler.success(res, "Admin logout successfully", tokens)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminsData = async (req, res) => {
//   try {
//     const data = await admin.getAllAdmins()
//
//     responseHandler.success(res, "Admins Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminData = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//
//     const data = await admin.getAdminById(id)
//
//     responseHandler.success(res, "Admin Data Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminActivities = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//
//     const data = await admin.getAdminActivities(id)
//
//     responseHandler.success(res, "Admin Data Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminUpdate = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//     const { number, email, password, ...rest } = req?.body
//
//     await admin.updateAdmin(id, rest)
//
//     await addActivity(AdminActivities, id, "ADMIN_UPDATED", "admin updated")
//
//     responseHandler.success(res, "Admin Updated successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, "", error.message,)
//   }
// }
//
// exports.adminDelete = async (req, res) => {
//   try {
//     const { id = '', } = req?.params
//
//     if (!id) {
//       return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
//     }
//
//     await admin.deleteAdmin(id)
//
//     await addActivity(AdminActivities, id, "ADMIN_DELETED", "admin deleted")
//
//     responseHandler.success(res, "Admin Deleted successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, "", error.message,)
//   }
// }
//
// exports.adminRestore = async (req, res) => {
//   try {
//     const { id = '', } = req?.params
//
//     if (!id) {
//       return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
//     }
//
//     await admin.restoreAdmin(id)
//
//     await addActivity(AdminActivities, id, "ADMIN_RESTORED", "admin restored")
//
//     responseHandler.success(res, "Admin Restored successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, error.message, "")
//   }
// }
//
// const db = require('../../models')
// const logger = require("../../utils/logger")
// const responseHandler = require("../../utils/responseHandler")
// const { uniqueCheck } = require("../../utils/uniqueCheck")
// const { addActivity } = require('../../utils/activities')
// const Admin = db.sequelize.model('admins')
// const AdminActivities = db.sequelize.model('admin_activities')
// const admin = require("../../services/admin/admin")
//
// exports.adminCreate = async (req, res) => {
//   try {
//     const {
//       firstName = '',
//       lastName = '',
//       email = '',
//       number = '',
//       password = '',
//     } = req.body
//
//     if (!(firstName && lastName && email && number && password)) {
//       return responseHandler.error(res, 400, "Required fields are invalid", "required fields are empty or invalid")
//     }
//
//     console.log(req.body, 'user 000000 lllllllllllllllll')
//
//     let isExisting = await uniqueCheck(Admin, req.body, "admin")
//
//     console.log(isExisting, 'user 111111 lllllllllllllllll')
//
//     if (isExisting?.reason) {
//       return responseHandler.error(res, 409, isExisting.message, isExisting.reason)
//     }
//
//     const user = await admin.createAdmin(req.body)
//
//     console.log(user, 'user 222222 lllllllllllllllll')
//
//     return responseHandler.created(res, "Admin registered successfully", user)
//   }
//   catch (error) {
//     logger.error(`${ error }`)
//     return responseHandler.error(res, 500, "Error while registering Admin", error?.message,)
//   }
// }
//
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email = '', password = '' } = req.body
//
//     if (!(email && password)) {
//       return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
//     }
//
//     const resp = await admin.loginAdmin({ email, password })
//
//     if (!(Object.keys(resp).length > 0)) {
//       return responseHandler.unauthorized(res, "Email or Password is Incorrect", "email or password is incorrect or no data found")
//     }
//
//     responseHandler.success(res, "Admin Login successfully", resp)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminLogout = async (req, res) => {
//   try {
//     const tokens = await admin.logoutAdmin(req.body)
//
//     responseHandler.success(res, "Admin logout successfully", tokens)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminsData = async (req, res) => {
//   try {
//     const data = await admin.getAllAdmins()
//
//     responseHandler.success(res, "Admins Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminData = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//
//     const data = await admin.getAdminById(id)
//
//     responseHandler.success(res, "Admin Data Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminActivities = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//
//     const data = await admin.getAdminActivities(id)
//
//     responseHandler.success(res, "Admin Data Fetched successfully", data)
//   }
//   catch (error) {
//     responseHandler.error(res, 400, "", error.message,)
//   }
// }
//
// exports.adminUpdate = async (req, res) => {
//   try {
//     const { id = '' } = req?.params
//     const { number, email, password, ...rest } = req?.body
//
//     await admin.updateAdmin(id, rest)
//
//     await addActivity(AdminActivities, id, "ADMIN_UPDATED", "admin updated")
//
//     responseHandler.success(res, "Admin Updated successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, "", error.message,)
//   }
// }
//
// exports.adminDelete = async (req, res) => {
//   try {
//     const { id = '', } = req?.params
//
//     if (!id) {
//       return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
//     }
//
//     await admin.deleteAdmin(id)
//
//     await addActivity(AdminActivities, id, "ADMIN_DELETED", "admin deleted")
//
//     responseHandler.success(res, "Admin Deleted successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, "", error.message,)
//   }
// }
//
// exports.adminRestore = async (req, res) => {
//   try {
//     const { id = '', } = req?.params
//
//     if (!id) {
//       return responseHandler.error(res, 400, "Required Fields are Invalid", "Id is empty or invalid")
//     }
//
//     await admin.restoreAdmin(id)
//
//     await addActivity(AdminActivities, id, "ADMIN_RESTORED", "admin restored")
//
//     responseHandler.success(res, "Admin Restored successfully")
//   }
//   catch (error) {
//     responseHandler.error(res, 500, error.message, "")
//   }
// }
//
