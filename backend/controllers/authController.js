const {User, Specialist} = require('../database/db');
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");

/**
 * allows users to sign up for an account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const register = async (req, res) => {
    const { fname, lname, email, password, phone, photo, role, gender } = req.body;

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array()});
        }

        let user = null;

        if(role === "patient") {
            user = await User.findOne({ where: { email: email } });
        } else if (role === "doctor") {
            user = await Specialist.findOne({ where: { email: email } });
        }

        if(user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        //hash the password
        //hash password for security using bycrypt
        // salt is a random value (cryptographic)
        //10 rep time taken to compute the hash
        //takes two arguments -password and salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === "patient") {
            user = await User.create({
                fname: fname,
                lname: lname,
                email: email,
                password: hashedPassword,
                phone: phone,
                photo: photo || null,
                role: role,
                gender: gender,
            });
        }else if(role === "specialist"){
            
            user = await Specialist.create({
                fname: fname,
                lname: lname,
                email: email,
                password: hashedPassword,
                phone: phone,
                photo: photo || null,
                role: role,
                gender: gender
            });
        }
        
        res.status(200).json({
            success: true,
            message: "User registered successfully",
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error, Try again",
        });
    }
};

/**
 * allows user to login to existing account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
    const {email} = req.body;
    try {

        if(!email || !req.body.password){
            return res.status(400).json({success: false, message: "Email or passwod cannot be empty", data: null})
        }

        let user = null;

        // Find a user in either User or Doctor model based on email
        const patient = await User.findOne({where: {email: email}});
        // Check if the user exists
        if (patient){
            user = patient;
        }else{
            const specialist = await Specialist.findOne({where: {email: email}});
            if (specialist){
                user = specialist;
            }
        }
        
        
        //check if user exists or not
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist",
                data: null
            });
        }

        
        //if user exist compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
                data: null
            });
        }

        // Destructure to exclude the password
        const { password, ...userWithoutPassword } = user.dataValues;
        //add to session if matched
        req.session.user = userWithoutPassword;
        req.session.authorized = true;
        // Set session expiration (1 hour from now)
        const sessionExpiration = new Date().getTime() + (60 * 60 * 1000); 
        req.session.sessionExpiration = sessionExpiration;
        console.log(req.session)
        res.status(200).json({success:true, message :"Successfully logged in", user: userWithoutPassword, session: {
            expires: req.session.sessionExpiration,
            authorized: req.session.authorized
        }});

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Failed to log in"});
    }
}

module.exports = { register, login };