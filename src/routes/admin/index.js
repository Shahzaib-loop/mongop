const express = require('express')
const router = express.Router()
const {adminRegister, adminLogin, adminLogout, adminData} = require('../../controllers/admin')

router.get('/', (req, res, next) => {
    res.json({title: 'Admin', Message: `I'm listening on ${process.env.PORT}`})
})

router.post('/register', adminRegister)
router.post('/login', adminLogin)
router.post('/logout', adminLogout)

router.get('/', adminData)

module.exports = router
