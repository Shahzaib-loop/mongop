require("dotenv").config()

const config = {
  server: {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  mongoDB: {
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
  }
}

module.exports = config
