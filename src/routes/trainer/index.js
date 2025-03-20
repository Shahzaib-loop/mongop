const express = require('express')
const router = express.Router()
const {
  trainerRegister,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerUpdate,
  trainerDelete,
} = require('../../controllers/trainer')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainer', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', trainerRegister)
router.post('/login', trainerLogin)
router.post('/logout', trainerLogout)

router.get('/', trainersData)
router.get('/:id', trainerData)

router.post('/create', trainerRegister)
router.post('/update', trainerUpdate)
router.post('/delete', trainerDelete)

module.exports = router
