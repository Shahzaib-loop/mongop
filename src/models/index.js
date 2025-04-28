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
}

// Dynamically load all model files except index.js
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;  // Store the model in db object
  });

// Set up associations (if you have associations in a separate file)
if (fs.existsSync(path.join(__dirname, 'zAssociations.js'))) {
  require('./zAssociations')(db);  // Apply associations after loading models
}


(async () => {
  try {
    await sequelize.authenticate();
    logger.info("PostgreSQL Connected Successfully");
    await sequelize.sync();
    logger.info("Tables synced!");
  }
  catch (err) {
    logger.error(`PostgreSQL connection error: ${ err }`);
  }
})();

console.log(db,'yyyyyyyyyyyyyyyyy')

module.exports = db;

