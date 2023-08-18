const Sequelize = require('sequelize');
const sequelize = new Sequelize('reactjs_todo', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false, // tắt log
});

module.exports = sequelize;