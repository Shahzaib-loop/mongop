const express = require('express')
const router = express.Router()
const {
  adminCreate,
  adminLogin,
  adminLogout,
  adminsData,
  adminData,
  adminUpdate,
  adminDelete,
  adminRestore,
} = require('../../controllers/admin')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Admin', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', adminCreate)
router.post('/login', adminLogin)
router.post('/logout', adminLogout)

router.get('/', adminsData)
router.get('/:id', adminData)

router.post('/create', adminCreate)
router.post('/update/:id', adminUpdate)
router.post('/delete/:id', adminDelete)
router.post('/restore/:id', adminRestore)

module.exports = router
