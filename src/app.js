const createError = require('http-errors')
const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const logger = require('./utils/logger')
const { checkAuthentication } = require('./utils/auth')
const responseHandler = require('./utils/responseHandler')

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(checkAuthentication())

app.use((req, res, next) => {
  const start = process.hrtime()

  res.on("start", () => {
    const diff = process.hrtime(start)
    const responseTime = (diff[0] * 1000 + diff[1] / 1e6).toFixed(4)

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

app.use('/api', require('./routes/index'))


app.get('/healthcheck', (req, res) => res.status(200).send({ status: 'ok', health: 'ok', }))

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  responseHandler.error(res, 500, `Error: ${ err.message }`)
})

module.exports = app