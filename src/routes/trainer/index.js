const express = require('express')
const router = express.Router()
const trainer = require('../../controllers/trainer/trainer')
const traineeWorkout = require('../../controllers/trainer/traineeWorkout')
const trainerTrainee = require('../../controllers/trainer/trainerTrainee')
const trainerNotes = require('../../controllers/trainer/trainerNotes')
const trainee = require('../../controllers/trainee/trainee')

// for testing only
router.get('/listen', (req, res, next) => {
  res.json({ title: 'I am Trainer', Message: `I'm listening on ${ process.env.PORT }` })
})

// router.post('/register', trainer.trainerCreate)
router.post('/login', trainer.trainerLogin)
router.post('/logout', trainer.trainerLogout)

router.get('/', trainer.trainerAll)
router.get('/:id', trainer.trainerById)
router.get('/activities/:id', trainer.trainerActivities)

// create Trainer wala decide krna ha ke siraf gym bna sakta
// ha ya trainer khud bi register kr sakta ha
// agr alag register ho sakta ha to FE pr check hoga role ka
// ni to gym create hoga jo iska

// router.post('/create', trainer.trainerCreate)
router.post('/update/:id', trainer.trainerUpdate)
router.post('/updatePhone/:id', trainer.trainerUpdatePhone)
router.post('/updateEmail/:id', trainer.trainerUpdateEmail)
router.post('/updatePassword/:id', trainer.trainerUpdatePassword)
router.post('/delete/:id', trainer.trainerDelete)
router.post('/restore/:id', trainer.trainerRestore)

// ==========>>>> trainee
router.post('/trainee', trainerTrainee.trainerTraineeData)
router.post('/trainee/create', trainee.traineeCreate)
router.post('/trainee/update/:id', trainerTrainee.trainerTraineeUpdate)
router.post('/trainee/delete/:id', trainee.traineeDelete)
router.post('/trainee/restore/:id', trainee.traineeRestore)

// ==========>>>> Workouts
router.get('/workouts/:id', traineeWorkout.traineeWorkoutData)
router.post('/workouts/create/:trainee_id', traineeWorkout.traineeWorkoutCreate)
router.post('/workouts/update/:id', traineeWorkout.traineeWorkoutUpdate)
router.post('/workouts/delete/:id', traineeWorkout.traineeWorkoutDelete)

// ==========>>>> Notes
router.get('/notes/:id', trainerNotes.trainerNoteData)
router.post('/notes/create/:id', trainerNotes.trainerNoteCreate)
router.post('/notes/update/:id', trainerNotes.trainerNoteUpdate)
router.post('/notes/delete/:id', trainerNotes.trainerNoteDelete)

module.exports = router
