const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
require('dotenv').config();

const isTesting = process.env.NODE_ENV === 'test';
const dbUrl = isTesting ? process.env.DB_TEST_URL : process.env.DB_URL;

const sequelize = new Sequelize(dbUrl, {
  logging: false,
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
module.exports = db;
