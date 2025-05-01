const express = require('express')
const router = express.Router()
const gym = require('../../controllers/gym/gym')
const trainer = require('../../controllers/trainer/trainer')
const trainee = require('../../controllers/trainee/trainee')

// health check
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Gym', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/login', gym.gymLogin)
router.post('/logout', gym.gymLogout)

router.get('/', gym.gymAll)
router.get('/:id', gym.gymById)
router.get('/activities/:id', gym.gymActivities)

router.post('/create', gym.gymCreate)
router.post('/update/:id', gym.gymUpdate)
router.post('/updateOwner/:id', gym.gymUpdateOwner)
router.post('/updatePhone/:id', gym.gymUpdatePhoneNumber)
router.post('/updateEmail/:id', gym.gymUpdateEmail)
router.post('/updatePassword/:id', gym.gymUpdatePassword)

router.post('/delete/:id', gym.gymDelete)
router.post('/restore/:id', gym.gymRestore)

// ==========>>>> trainer
router.post('/trainer', trainer.trainerAllByGymId)
router.post('/addTrainer', trainer.trainerCreate)
router.post('/updateTrainer/:id', trainer.trainerUpdate)
router.post('/updateTrainerPhone/:id', trainer.trainerUpdatePhone)
router.post('/updateTrainerEmail/:id', trainer.trainerUpdateEmail)
router.post('/updateTrainerPassword/:id', trainer.trainerUpdatePassword)

router.post('/deleteTrainer/:id', trainer.trainerDelete)
router.post('/restoreTrainer/:id', trainer.trainerRestore)

// ==========>>>> trainee
router.post('/addTrainee', trainee.traineeCreate)
router.post('/updateTrainee/:id', trainee.traineeUpdate)
router.post('/updateTraineePhone/:id', trainee.traineeUpdatePhone)
router.post('/updateTraineeEmail/:id', trainee.traineeUpdateEmail)
router.post('/updateTraineePassword/:id', trainee.traineeUpdatePassword)
router.post('/assignTrainer/:id', trainee.traineeUpdateTrainer)

router.post('/deleteTrainee/:id', trainee.traineeDelete)
router.post('/restoreTrainee/:id', trainee.traineeRestore)

module.exports = router
