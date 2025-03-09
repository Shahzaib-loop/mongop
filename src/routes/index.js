const express = require('express')
const router = express.Router()
const Trainer = require('../models/trainer')
const logger = require('../utils/logger')
const {authMiddleware} = require('../middlewares/authMiddleware')
const {dataTest} = require('../services')

// router.post('/data', authMiddleware, dataTest)
router.get('/', (req, res, next) => {
    res.json({title: 'Express', Message: `I'm listening on ${process.env.PORT}`})
})

router.post('/data', dataTest)

module.exports = router
