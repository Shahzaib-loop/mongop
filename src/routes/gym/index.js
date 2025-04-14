const express = require('express')
const router = express.Router()
const gym = require('../../controllers/gym/gym')
const gymTrainer = require('../../controllers/gym/gymTrainer')
const gymTrainee = require('../../controllers/gym/gymTrainee')

// health check
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Gym', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', gym.gymCreate)
router.post('/login', gym.gymLogin)
router.post('/logout', gym.gymLogout)

router.get('/', gym.gymsData)
router.get('/:id', gym.gymData)
router.get('/activities/:id', gym.gymActivities)

router.post('/create', gym.gymCreate)
router.post('/update/:id', gym.gymUpdate)
router.post('/delete/:id', gym.gymDelete)
router.post('/restore/:id', gym.gymRestore)

router.post('/addtrainer/:id', gymTrainer.addGymTrainer)
router.post('/addtrainee/:id', gymTrainee.addGymTrainee)

module.exports = router
