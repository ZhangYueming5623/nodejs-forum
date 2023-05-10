const { sequelize, Sequelize } = require('./database');
const { DataTypes } = Sequelize;

const User = sequelize.define('User', {
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    schema: 'purematch',
    timestamps: false
});


module.exports = {
    User
};