const createError = require('http-errors')
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const logger = require('./utils/logger')
const responseHandler = require('./utils/responseHandler')

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const start = Date.now()

  res.on("finish", () => {
    const responseTime = Date.now() - start

    logger.http({
      message: "Incoming request",
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      responseTime,
    })
  })

  next()
})

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(500).json({ body: err.message })
})

app.get('/healthcheck', (req, res) => res.status(200).send('ok'))

module.exports = app