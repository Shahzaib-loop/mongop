const express = require('express')
const router = express.Router()
const {
  gymRegister,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymUpdate,
  gymDelete,
  gymRestore,
} = require('../../controllers/gym')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Gym', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', gymRegister)
router.post('/login', gymLogin)
router.post('/logout', gymLogout)

router.get('/', gymsData)
router.get('/:id', gymData)

router.post('/create', gymRegister)
router.post('/update/:id', gymUpdate)
router.post('/delete/:id', gymDelete)
router.post('/restore/:id', gymRestore)

module.exports = router
