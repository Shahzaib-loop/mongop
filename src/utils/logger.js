const winston = require("winston")
const moment = require('moment');

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "cyan",
}

winston.addColors(colors)

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    // winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({
                             timestamp = 0,
                             level = 'unknown',
                             message = 'default message',
                             method = '---',
                             url = '---',
                             status = '---',
                             responseTime = 0,
                           }) =>
      `${ method } ${ url } ${ status } ${ responseTime } ms | ${ moment(timestamp).format("DD-MM-YYYY HH:mm:ss.SSS Z") } | ${ level.toUpperCase() }: ${ message }`
    )
  ),
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/http.log", level: "http" }),
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "logs/combined.log" })
    ]
})

module.exports = logger
