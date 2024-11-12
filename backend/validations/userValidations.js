const {check} = require("express-validator");

const updateUserValidation = [
    /*check('photo').optional().custom(value => {
        const picturePathRegex = /\.(jpeg|jpg|gif|png)$/i;
        if (!picturePathRegex.test(value)) {
            throw new Error('Invalid picture format');
        }
    }).withMessage('Must be a valid URL'),*/
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('fname').optional().notEmpty().withMessage('First name cannot be empty'),
    check('lname').optional().notEmpty().withMessage('Last name cannot be empty'),
    check('phone').optional().notEmpty().withMessage('Must be a valid phone number'),
    check('gender').optional().isIn(['male', 'female']).withMessage('Gender must be either male or female'),
]

module.exports = updateUserValidation;