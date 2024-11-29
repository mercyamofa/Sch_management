const { check, validationResult } = require('express-validator');
const Students = require('../models/students');
exports.validateStudent = [
    // Validate first_name
    check('first_name')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('First name must contain only alphabetic characters'),

    // Validate last_name
    check('last_name')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters long')
        .matches(/^[A-Za-z\s]+$/).withMessage('Last name must contain only alphabetic characters'),

    // Validate dob
    check('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Date of birth must be a valid date')
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date of birth must be in the format YYYY-MM-DD')
        
        .custom((value) => {
            const isValidDate = !isNaN(Date.parse(value));
            if (!isValidDate) {
                throw new Error('Date of birth must be a valid date');
            }
            const today = new Date();
            const dob = new Date(value);
            if (dob >= today) {
                throw new Error('Date of birth must be in the past');
            }
            return true;
        }),

    // Validate email
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
        .custom(async (value) => {
            const existingStudent = await  Students.findOne({ where: { email: value } });
            if (existingStudent) {
                throw new Error('Email is already in use');
            }
            return true;
        }),
        

    // Error handler middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
