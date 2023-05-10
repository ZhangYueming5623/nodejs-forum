// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '', {
    host: '',
    dialect: 'postgres',
    logging: false
});

module.exports = {
    sequelize,
    Sequelize,
};
