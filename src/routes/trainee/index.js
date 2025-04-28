const express = require('express')
const router = express.Router()
const trainee = require('../../controllers/trainee/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainee', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/login', trainee.traineeLogin)
router.post('/logout', trainee.traineeLogout)

router.get('/:id', trainee.traineeById)
router.get('/activities/:id', trainee.traineeActivities)

// router.post('/create', trainee.traineeCreate)
router.post('/update/:id', trainee.traineeUpdate)
router.post('/updatePhone/:id', trainee.traineeUpdatePhone)
router.post('/updateEmail/:id', trainee.traineeUpdateEmail)
router.post('/updatePassword/:id', trainee.traineeUpdatePassword)

router.get('/notes', trainee.traineeUpdatePassword)
router.get('/notes/:id', trainee.traineeUpdatePassword)
router.post('/note/create', trainee.traineeUpdatePassword)
router.post('/note/update/:id', trainee.traineeUpdatePassword)
router.post('/note/delete/:id', trainee.traineeUpdatePassword)

// router.post('/delete/:id', trainee.traineeDelete)
// router.post('/restore/:id', trainee.traineeRestore)

module.exports = router
