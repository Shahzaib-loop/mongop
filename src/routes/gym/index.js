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
router.post('/update', gymUpdate)
router.post('/delete', gymDelete)

module.exports = router
