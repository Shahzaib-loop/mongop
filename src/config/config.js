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
    },
    pgdb: {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        max: process.env.DB_POOL_MAX,
        min: process.env.DB_POOL_MIN
    }
}

module.exports = config
