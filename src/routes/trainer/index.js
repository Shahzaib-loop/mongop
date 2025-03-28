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

module.exports = router
