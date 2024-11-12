const {check} = require("express-validator");

const reviewValidator = [
    check('reviewText')
            .notEmpty().withMessage('Review text is required')
            .isLength({ max: 500 }).withMessage('Review text must not exceed 500 characters'),

    check('reviewRating').notEmpty().withMessage('Review rating is required').isInt({ min: 0, max: 5 }).withMessage('Review rating must be an integer between 0 and 5'),
        
        // You can also validate userId and specialistId as integers if they are supposed to be IDs
    check('userId')
        .isInt().withMessage('User ID must be a valid integer')
        .notEmpty().withMessage('User Id must not be empty'),

    check('specialistId')
        .isInt().withMessage('Specialist ID must be a valid integer')
        .notEmpty().withMessage('Specialist Id must not be empty'),
]

module.exports = reviewValidator;