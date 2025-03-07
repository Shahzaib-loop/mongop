const express = require('express')
const router = express.Router()
const Trainer = require('../models/trainer')
const logger = require('../utils/logger')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res, next) => {
  res.json({ title: 'Express', Message: `I'm listening on ${ process.env.PORT }` })
})

router.post('/data', authMiddleware, async (req, res) => {
  let { fname, lname, age, } = req.body

  console.log(req.body, "reqreqreqreq")

  Trainer.create({ fname, lname })
    .then(doc => console.log("Email saved:", doc))
    .catch(err => console.error("Error:", err))

  return res.json({ title: 'Express', Message: `I'm listening on ${ process.env.PORT }` })
})

module.exports = router
