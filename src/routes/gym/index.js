const express = require('express')
const router = express.Router()
const {
  gymCreate,
  gymLogin,
  gymLogout,
  gymsData,
  gymData,
  gymActivities,
  gymUpdate,
  gymDelete,
  gymRestore,
  addTrainer,
  addTrainee,
} = require('../../controllers/gym')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Gym', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', gymCreate)
router.post('/login', gymLogin)
router.post('/logout', gymLogout)

router.get('/', gymsData)
router.get('/:id', gymData)
router.get('/activities/:id', gymActivities)

router.post('/create', gymCreate)
router.post('/update/:id', gymUpdate)
router.post('/delete/:id', gymDelete)
router.post('/restore/:id', gymRestore)

router.post('/addtrainer/:id', addTrainer)
router.post('/addtrainee/:id', addTrainee)

module.exports = router
