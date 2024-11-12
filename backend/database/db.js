const { Sequelize } = require('sequelize');
let connection;
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log
});

async function connectDB(){
    try {
        if(!connection){
            connection = await sequelize.authenticate();
            console.log("==================================================");
            console.log(`>>>> Connection to ${process.env.DB_NAME} successful`);
            console.log("==================================================");
        }
    } catch (error) {
        console.error(`>>> Error occured connecting to ${process.env.DB_NAME}`, error);
        process.exit();
    }
}

//const Experience = require('../models/ExperienceSchema')(sequelize, Sequelize.DataTypes);
const User = require('../models/UserSchema')(sequelize, Sequelize.DataTypes);
const Specialist = require('../models/SpecialistSchema')(sequelize, Sequelize.DataTypes);
const Appointments = require('../models/AppointmentsSchema')(sequelize, Sequelize.DataTypes);
const Reviews = require('../models/ReviewsSchema')(sequelize, Sequelize.DataTypes);
//const Qualifications = require('../models/QualificationsSchema')(sequelize, Sequelize.DataTypes);

User.hasMany(Appointments, { foreignKey: 'userId' });
User.hasMany(Reviews, { foreignKey: 'userId' });

Specialist.hasMany(Appointments, { foreignKey: 'specialistId' });
Specialist.hasMany(Reviews, { foreignKey: 'specialistId' });
//Specialist.hasMany(Qualifications, {foreignKey: 'specialistId'});
//Specialist.hasMany(Experience, {foreignKey: 'specialistId'})

module.exports = { sequelize, connectDB, User, Specialist, Appointments, Reviews };
