const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/pruebaContenido')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require("./usuario-model.js")(sequelize, Sequelize);
db.categoria = require("./categoria-model.js")(sequelize, Sequelize);
db.contenido = require("./contenido-model.js")(sequelize, Sequelize);

module.exports = db;