module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define('Appointments', {
        appointmentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'userId'
            },
            allowNull: false
        },
        specialistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'specialists',
                key: 'specialistId'
            },
            allowNull: false
        },
        appointmentDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        appointmentStatus: {
            type: DataTypes.ENUM,
            values: ["pending", "accepted", "rejected"],
            defaultValue: "pending",
            allowNull: false
        },
    }, {
        timestamps: true
    });

    return Appointments;
}