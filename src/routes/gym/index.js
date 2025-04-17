const express = require('express')
const router = express.Router()
const gym = require('../../controllers/gym/gym')
const gymTrainer = require('../../controllers/gym/gymTrainer')
const gymTrainee = require('../../controllers/gym/gymTrainee')
const trainer = require('../../controllers/trainer/trainer')

// health check
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Gym', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', gym.gymCreate)
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

router.get('/trainer', gymTrainer.trainerAllByGymId)
router.post('/addTrainer', trainer.trainerCreate)
router.post('/updateTrainer/:id', trainer.trainerUpdate)
router.post('/updateTrainerPhone/:id', trainer.trainerUpdatePhone)
router.post('/updateTrainerEmail/:id', trainer.trainerUpdateEmail)
router.post('/updateTrainerPassword/:id', trainer.trainerUpdatePassword)
router.post('/deleteTrainer/:id', trainer.trainerDelete)

router.post('/addTrainee/:id', gymTrainee.addGymTrainee)
router.post('/updateTrainee/:id', gymTrainee.updateGymTrainee)
router.post('/deleteTrainee/:id', gymTrainee.deleteGymTrainee)

module.exports = router
