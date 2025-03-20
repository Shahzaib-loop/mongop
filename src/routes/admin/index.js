const express = require('express')
const router = express.Router()
const {
  adminRegister,
  adminLogin,
  adminLogout,
  adminsData,
  adminData,
  adminUpdate,
  adminDelete
} = require('../../controllers/admin')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Admin', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', adminRegister)
router.post('/login', adminLogin)
router.post('/logout', adminLogout)

router.get('/', adminsData)
router.get('/:id', adminData)

router.post('/create', adminRegister)
router.post('/update', adminUpdate)
router.post('/delete', adminDelete)

module.exports = router
