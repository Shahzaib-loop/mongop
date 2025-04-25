// require('./associations')
// const { sequelize } = require("../config/db")
// const logger = require("../utils/logger")
//
// const db = {}
// db.sequelize = sequelize
//
// (async () => {
//   try {
//     await sequelize.authenticate()
//     logger.info("PostgreSQL Connected Successfully")
//
//     await sequelize.sync()
//     logger.info("Tables synced!")
//   }
//   catch (err) {
//     logger.error(`PostgreSQL connection Error: ${ err }`)
//   }
// })()
//
// module.exports = db


const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const logger = require('../utils/logger');

const db = {
  sequelize,
  Sequelize,
};

// Auto-import all model files
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);

    try {
      console.log(`Loading model: ${file}`);
      // const model = require(path.join(__dirname, file))(sequelize, DataTypes);
      db[model.name] = model;
    } catch (err) {
      console.error(`❌ ${model} Error loading model ${file}:`, err.message);
    }
  });


// Setup associations if present
if (fs.existsSync(path.join(__dirname, 'associations.js'))) {
  require('./associations')(db);
}

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("PostgreSQL Connected Successfully");
    await sequelize.sync();
    logger.info("Tables synced!");
  } catch (err) {
    logger.error(`PostgreSQL connection error: ${err}`);
  }
})();

module.exports = db;

