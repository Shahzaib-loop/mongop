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

const logFormat = winston.format.printf(({ timestamp, level, message, method = "---" }) => {
  const formattedTime = moment(timestamp).format("YYYY-MM-DD HH:mm:ss.SSS Z");
  return `${ method } | ${ formattedTime } | ${ level.toUpperCase() }: ${ message }`;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    // winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp = 0, level = 'unknown', message = 'default message', method = '---' }) =>
      `${ method } | ${ moment(timestamp).format("YYYY-MM-DD HH:mm:ss.SSS Z") } | ${ level.toUpperCase() }: ${ message }`
    )
  ),
  transports:
    [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/http.log", level: "http" }),
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
      new winston.transports.File({ filename: "logs/combined.log" })
    ]
})

module.exports = logger
