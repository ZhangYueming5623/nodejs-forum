const { sequelize, Sequelize } = require('./database');
const { DataTypes } = Sequelize;

const PostPic = sequelize.define('PostPic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pic_name: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    bucketkey: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'postpics',
    schema: 'purematch',
    timestamps: false
});


module.exports = {
    PostPic
};