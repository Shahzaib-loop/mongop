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

router.post('/login', trainer.trainerLogin)
router.post('/logout', trainer.trainerLogout)

router.get('/', trainer.trainersData)                    // clear
router.get('/:id', trainer.trainerData)                  // clear
router.get('/activities/:id', trainer.trainerActivities) // clear

// create Trainer wala decide krna ha ke siraf gym bna sakta
// ha ya trainer khud bi register kr sakta ha
// agr alag register ho sakta ha to FE pr check hoga role ka
// ni to gym create hoga jo iska

router.post('/create', trainer.trainerCreate)            // clear
router.post('/update/:id', trainer.trainerUpdate)        // clear
router.post('/delete/:id', trainer.trainerDelete)        // clear
router.post('/restore/:id', trainer.trainerRestore)      // clear

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
