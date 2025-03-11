const express = require("express")
const { register, login, refreshToken } = require("../controllers/auth")
const { dataTest } = require('../services')
const { verifyRole, } = require('../middlewares/roleIdentifier')
const { verifyToken, } = require('../middlewares/authentication')

const router = express.Router()

console.log('tttttttttt')

router.post('/', (req, res) => {
  return res.status(201).json({ testing: 'Testing Auth Routes' })
})
router.post('/data', dataTest)

router.post("/register", register)

router.post("/admin/login", login)

router.get("/user/", verifyRole(["admin"]), (req, res) => {
  console.log('get user')
})

router.post("/refresh-token", refreshToken)

module.exports = router
