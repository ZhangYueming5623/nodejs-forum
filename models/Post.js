const { sequelize, Sequelize } = require('./database');
const { DataTypes } = Sequelize;

const Post = sequelize.define('Post', {
    postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    updatetime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(3000)
    }
}, {
    tableName: 'posts',
    schema: 'purematch',
    timestamps: false
});

module.exports = {
    Post
};