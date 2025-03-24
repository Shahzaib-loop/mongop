const express = require('express')
const router = express.Router()
const adminRouter = require('./admin')
const gymRouter = require('./gym')
const trainerRouter = require('./trainer')
const traineeRouter = require('./trainee')

router.get('/', (req, res, next) => {
  res.json({ title: 'Router', Message: `I'm listening on ${ process.env.PORT }` })
})

// activitiesssssss

router.use('/admin', adminRouter)
router.use('/gym', gymRouter)
router.use('/trainer', trainerRouter)
router.use('/trainee', traineeRouter)

module.exports = router
