module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING(40)
        },
        university: {
            type: DataTypes.STRING(50)
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
        },
        grade: {
            type: DataTypes.FLOAT,
        }
    }, {
        timestamps: true,
    })

    return Student;
};