const Sequelize = require('sequelize'),
  fs = require('fs'),
  path = require('path'),
  basename = path.basename(__filename);
  require('dotenv').config();

const dbUrl = process.env.DB_URL;

const sequelize = new Sequelize(dbUrl, {
  logging: false,
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync();

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
module.exports = db;
