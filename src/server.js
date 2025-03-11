require("dotenv").config()
const debug = require('debug')('nodeP:server')
const app = require('../src/app')
const logger = require('../src/utils/logger')
const { connectDB, pool, } = require('./config/db')

connectDB()

// app.get("/", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.json({ message: "PostgreSQL connected!", time: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

const PORT = normalizePort('5000')

app.listen(PORT, () => logger.info(`I'm Listening on ${ PORT }`))
app.on('error', onError)
app.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)

  return isNaN(port)
    ? val
    : port >= 0
      ? port
      : false
}

function onError(error) {
  if (error.syscall !== 'listen') throw error

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
