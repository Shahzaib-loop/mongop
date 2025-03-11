const express = require('express')
const router = express.Router()
const authRouter = require('./auth')

router.get('/', (req, res, next) => {
  res.json({ title: 'Express', Message: `I'm listening on ${ process.env.PORT }` })
})

router.use('/auth', authRouter)
// router.use('/admin', adminRouter)
// router.use('/user', userRouter)

module.exports = router
