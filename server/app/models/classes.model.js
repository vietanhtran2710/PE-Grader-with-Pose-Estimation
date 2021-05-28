module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("class", {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            autoIncrement: true
        },
        weekDay: {
            type: DataTypes.STRING(10)
        },
        startTime: {
            type: DataTypes.STRING(5)
        },
        subject: {
            type: DataTypes.STRING(30)
        }
    }, {
        timestamps: true,
    });

    return Class;
};