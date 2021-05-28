module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post', {
        postID: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        postName: {
            type: DataTypes.TEXT
        },
        content: {
            type: DataTypes.TEXT,
        }
    }, {
        tableName: 'post',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    })
}