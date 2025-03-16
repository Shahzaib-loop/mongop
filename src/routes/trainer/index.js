const express = require("express")
const { register, login, refreshToken } = require("../controllers/auth")
const { dataTest } = require('../services')
const { verifyRole, } = require('../middlewares/roleIdentifier')
const { verifyToken, } = require('../middlewares/authentication')

const router = express.Router()

router.post('/data', dataTest)

router.post("/register", register)
router.post("/admin/login", login)
router.post("/refresh-token", refreshToken)

router.get("/user/", verifyToken,verifyRole(["admin"]), (req, res) => {
    console.log('get user')
})

module.exports = router
