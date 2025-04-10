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
} = require('../../controllers/trainer/trainer')
const {
  traineeWorkoutData,
  traineeWorkoutCreate,
  traineeWorkoutUpdate,
  traineeWorkoutDelete,
} = require('../../controllers/trainer/traineeWorkout')
const {
  trainerTraineeData,
  trainerTraineeUpdate,
} = require('../../controllers/trainer/trainerTrainee')
const {
  trainerNoteData,
  trainerNoteCreate,
  trainerNoteUpdate,
  trainerNoteDelete
} = require('../../controllers/trainer/trainerNotes')
const {
  traineeCreate,
  traineeDelete,
  traineeRestore,
} = require('../../controllers/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainer', Message: `I'm listening on ${ process.env.PORT }` })
})

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
router.post('/trainee', trainerTraineeData)
router.post('/trainee/create', traineeCreate)
router.post('/trainee/update/:id', trainerTraineeUpdate)
router.post('/trainee/delete/:id', traineeDelete)
router.post('/trainee/restore/:id', traineeRestore)

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
