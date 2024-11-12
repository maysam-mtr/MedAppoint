module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        specialistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'specialists',
                key: 'specialistId'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'userId'
            },
            allowNull: false
        },
        reviewText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reviewRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            },
            defaultValue: 0
        }
    }, {
        timestamps: true,
    });

    return Reviews;
}