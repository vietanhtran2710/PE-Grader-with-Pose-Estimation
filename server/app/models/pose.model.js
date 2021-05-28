module.exports = (sequelize, DataTypes) => {
    const Pose = sequelize.define('pose', {
        poseID: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        imageURI: {
            type: DataTypes.TEXT
        },
        poseFileURI: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'pose',
        timestamps: false,
    })

    return Pose
};