const express = require('express')
const router = express.Router()
const adminRouter = require('./admin')

router.get('/', (req, res, next) => {
  res.json({ title: 'Router', Message: `I'm listening on ${ process.env.PORT }` })
})

router.use('/admin', adminRouter)
// router.use('/admin', adminRouter)
// router.use('/user', userRouter)

module.exports = router
