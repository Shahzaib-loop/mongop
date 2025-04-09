const express = require('express')
const router = express.Router()
const {
  trainerCreate,
  trainerLogin,
  trainerLogout,
  trainersData,
  trainerData,
  trainerActivities,
  trainerUpdate,
  trainerDelete,
  trainerRestore,
  trainerTraineeData,
  trainerTraineeCreate,
  trainerTraineeUpdate,
  trainerTraineeDelete,
  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,
  trainerNoteData,
  trainerNoteCreate,
  trainerNoteUpdate,
  trainerNoteDelete,
} = require('../../controllers/trainer')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainer', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/register', trainerCreate)
router.post('/login', trainerLogin)
router.post('/logout', trainerLogout)

router.get('/', trainersData)
router.get('/:id', trainerData)
router.get('/activities/:id', trainerActivities)

router.post('/create', trainerCreate)
router.post('/update/:id', trainerUpdate)
router.post('/delete/:id', trainerDelete)
router.post('/restore/:id', trainerRestore)

// ==========>>>> trainee
router.get('/trainee/:id', trainerTraineeData)
router.post('/trainee/create/:traineeId', trainerTraineeCreate)
router.post('/trainee/update/:id', trainerTraineeUpdate)
router.post('/trainee/delete/:id', trainerTraineeDelete)

// ==========>>>> Workouts
router.get('/workouts/:id', traineeWorkoutData)
router.post('/workouts/create/:traineeId', traineeWorkoutCreate)
router.post('/workouts/update/:id', traineeWorkoutUpdate)
router.post('/workouts/delete/:id', traineeWorkoutDelete)

// ==========>>>> Notes
router.get('/notes/:id', trainerNoteData)
router.post('/notes/create/:id', trainerNoteCreate)
router.post('/notes/update/:id', trainerNoteUpdate)
router.post('/notes/delete/:id', trainerNoteDelete)

module.exports = router
