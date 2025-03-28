const express = require('express')
const router = express.Router()
const {
  traineeCreate,
  traineeLogin,
  traineeLogout,
  traineesData,
  traineeData,
  traineeActivities,
  traineeUpdate,
  traineeDelete,
  traineeRestore,
} = require('../../controllers/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainee', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', traineeCreate)
router.post('/login', traineeLogin)
router.post('/logout', traineeLogout)

router.get('/', traineesData)
router.get('/:id', traineeData)
router.get('/activities/:id', traineeActivities)

router.post('/create', traineeCreate)
router.post('/update/:id', traineeUpdate)
router.post('/delete/:id', traineeDelete)
router.post('/restore/:id', traineeRestore)

module.exports = router
