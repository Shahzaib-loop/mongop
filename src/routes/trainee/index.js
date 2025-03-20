const express = require('express')
const router = express.Router()
const {
  traineeRegister,
  traineeLogin,
  traineeLogout,
  traineesData,
  traineeData,
  traineeUpdate,
  traineeDelete,
} = require('../../controllers/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainee', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', traineeRegister)
router.post('/login', traineeLogin)
router.post('/logout', traineeLogout)

router.get('/', traineesData)
router.get('/:id', traineeData)

router.post('/create', traineeRegister)
router.post('/update', traineeUpdate)
router.post('/delete', traineeDelete)

module.exports = router
