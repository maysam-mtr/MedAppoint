const {check} = require("express-validator");

const registerValidator = [
    check('fname')
            .notEmpty().withMessage('First name is required'),

        check('lname')
            .notEmpty().withMessage('Last name is required'),

        check('email')
            .isEmail().withMessage('Must be a valid email address')
            .notEmpty().withMessage('Email is required'),

        check('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .notEmpty().withMessage('Password is required'),

        check('phone')
            .optional()
            .notEmpty().withMessage('Must be a valid phone number'),

        /*check('photo')
            .optional()
            .isURL().withMessage('Must be a valid URL'),*/

        check('role')
            .isIn(['patient', 'specialist']).withMessage("Role must be either 'patient' or 'specialist'")
            .notEmpty().withMessage('Role is required'),

        check('gender')
            .notEmpty()
            .isIn(['male', 'female']).withMessage("Gender must be either 'male' or 'female'"),
]

module.exports = registerValidator;