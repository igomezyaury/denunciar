const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../../config').common.database;

// const connectionString = `${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
const connectionString = `postgresql://doadmin:hlpf9lre6983cr9y@db-postgresql-nyc1-72417-do-user-7982741-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require`;
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

const requireAllModels = () =>
  fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

const associateModels = () =>
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db);
  });

requireAllModels();
associateModels();

db.sequelizeInstance = sequelize;
db.sequelizePackage = Sequelize;

module.exports = db;
