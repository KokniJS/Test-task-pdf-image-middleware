const Sequelize = require("sequelize");
const sequelize = new Sequelize("test_1", "root", "nSnS44Tt", {
  dialect: "mysql",
  host: "localhost",
  operatorsAliases: false,
});

module.exports = sequelize;
