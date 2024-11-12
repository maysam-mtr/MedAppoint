module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.BLOB,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["patient", "specialist", "admin"],
            defaultValue: "patient"
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["male", "female"]
        }
    })

    return User;
}