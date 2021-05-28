module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("teacher", {
        fullName: {
            type: DataTypes.STRING(40)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        phoneNumber: {
            type: DataTypes.STRING(20)
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, {
        timestamps: true,
    })

    return Teacher;
};