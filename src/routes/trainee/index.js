const express = require('express')
const router = express.Router()
const trainee = require('../../controllers/trainee/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainee', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', trainee.traineeCreate)
router.post('/login', trainee.traineeLogin)
router.post('/logout', trainee.traineeLogout)

router.get('/', trainee.traineesData)
router.get('/:id', trainee.traineeData)
router.get('/activities/:id', trainee.traineeActivities)

router.post('/create', trainee.traineeCreate)
router.post('/update/:id', trainee.traineeUpdate)
router.post('/delete/:id', trainee.traineeDelete)
router.post('/restore/:id', trainee.traineeRestore)

module.exports = router
