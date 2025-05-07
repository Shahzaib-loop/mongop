const express = require('express')
const router = express.Router()
const trainer = require('../../controllers/trainer/trainer')
const traineeWorkout = require('../../controllers/trainer/traineeWorkouts')
const trainerNotes = require('../../controllers/trainer/trainerNotes')
const trainee = require('../../controllers/trainee/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainer', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/login', trainer.trainerLogin)
router.post('/logout', trainer.trainerLogout)

router.get('/', trainer.trainerAll)
router.get('/:id', trainer.trainerById)
router.get('/activities/:id', trainer.trainerActivities)

// router.post('/create', trainer.trainerCreate)
router.post('/update/:id', trainer.trainerUpdate)
router.post('/updatePhone/:id', trainer.trainerUpdatePhone)
router.post('/updateEmail/:id', trainer.trainerUpdateEmail)
router.post('/updatePassword/:id', trainer.trainerUpdatePassword)

router.post('/delete/:id', trainer.trainerDelete)
router.post('/restore/:id', trainer.trainerRestore)

// ==========>>>> trainee
router.post('/trainee', trainee.traineeAllByTrainerId)
router.post('/trainee/create', trainee.traineeCreate)
router.post('/trainee/update/:id', trainee.traineeUpdate)
router.post('/trainee/updatePhone/:id', trainee.traineeUpdatePhone)
router.post('/trainee/updateEmail/:id', trainee.traineeUpdateEmail)
router.post('/trainee/updatePassword/:id', trainee.traineeUpdatePassword)

router.post('/trainee/delete/:id', trainee.traineeDelete)
router.post('/trainee/restore/:id', trainee.traineeRestore)

// ==========>>>> Workouts
router.get('/workouts/:id', traineeWorkout.traineeWorkoutData)
router.post('/workouts/create', traineeWorkout.traineeWorkoutCreate)
router.post('/workouts/update/:id', traineeWorkout.traineeWorkoutUpdate)
router.post('/workouts/delete/:id', traineeWorkout.traineeWorkoutDelete)

// ==========>>>> Notes
router.get('/notes/:id', trainerNotes.trainerNoteData)
router.post('/notes/create/:id', trainerNotes.trainerNoteCreate)
router.post('/notes/update/:id', trainerNotes.trainerNoteUpdate)
router.post('/notes/delete/:id', trainerNotes.trainerNoteDelete)

module.exports = router
