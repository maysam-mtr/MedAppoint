const {check} = require("express-validator");

const updateSpecialistValidator = [

    check('fname').optional().notEmpty().withMessage('First name is required'),
    check('lname').optional().notEmpty().withMessage('Last name is required'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('photo').optional().custom(value => {
        const picturePathRegex = /\.(jpeg|jpg|gif|png)$/i;
        if (!picturePathRegex.test(value)) {
            throw new Error('Invalid picture format');
        }
    }).withMessage('Must be a valid format'),
    check('phone').optional().notEmpty().withMessage('Must be a valid phone number'),
    check('gender').optional().isIn(['male', 'female']).withMessage('Gender must be either male or female'),
    check('ticketPrice').optional().isFloat({ min: 0 }).withMessage('Ticket price must be a positive number'),
    check('role').optional().isIn(['specialist', 'admin']).withMessage('Role must be either specialist or admin'),
    check('specialization').optional().notEmpty().withMessage('Specialization cannot be empty'),
    check('about').optional().notEmpty().withMessage('About cannot be empty')
        .isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
    //check('qualifications').optional().isJSON().withMessage('Qualifications must be valid JSON'),
    //check('experience').optional().isJSON().withMessage('Experience must be valid JSON'),
    //check('timeSlots').optional().isJSON().withMessage('Time slots must be valid JSON'),
    check('averageRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Average rating must be between 0 and 5'),
    check('totalRating').optional().isInt({ min: 0 }).withMessage('Total rating must be a non-negative integer'),
    check('isApproved').optional().isIn(['pending', 'approved', 'cancelled']).withMessage("Status must be 'pending', 'approved', or 'cancelled'")
    
]

module.exports = updateSpecialistValidator;