const Sequelize = require("sequelize");
const {
  nameDb,
  PasswordDb,
  userDb,
  portDb,
  hostDB,
} = require("../config/index");
const fs = require("fs");
const path = require("path");

const baseName = path.basename(__filename);
const db = {};
const sequileze = new Sequelize(nameDb, userDb, PasswordDb, {
  dialect: "mysql",
  port: portDb,
  host: hostDB,
  logging: false,
});

const listFile = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js"
  );
});

listFile.forEach((file) => {
  const model = require(path.join(__dirname, file))(
    sequileze,
    Sequelize.DataTypes
  );
  db[model.name] = model;
});

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequileze = sequileze;
db.Sequelize = Sequelize;

sequileze.sync({});

module.exports = db;
