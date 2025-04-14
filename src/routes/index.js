const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ title: 'Router', Message: `I'm listening on ${ process.env.PORT }` })
})

// router.use('/admin', require('./admin'))
router.use('/gym', require('./gym'))
router.use('/trainer', require('./trainer'))
router.use('/trainee', require('./trainee'))

module.exports = router
