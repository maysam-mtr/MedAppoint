module.exports = (sequelize, DataTypes) => {
    const Specialist = sequelize.define("Specialist", {
        specialistId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        photo: {
            type: DataTypes.BLOB,
            //defaultValue: 'https://assets.dryicons.com/uploads/icon/svg/6013/61137bf2-bc82-4875-b33a-09232471432d.svg' 
        },
        phone: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["male", "female"]
        },
        ticketPrice: {
            type: DataTypes.FLOAT,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["specialist", "admin"],
            defaultValue: "specialist"
        },
        specialization: {
            type: DataTypes.STRING,
        },
        about: {
            type: DataTypes.STRING,
        },
        qualifications: {
            type: DataTypes.JSON
        },
        experience: {
            type: DataTypes.JSON
        },
        timeSlots: {
            type: DataTypes.JSON,
        },
        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        totalRating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        isApproved: {
            type: DataTypes.ENUM,
            values: ["pending", "approved", "cancelled"],
            defaultValue: "pending"
        }
    })

    return Specialist;
}