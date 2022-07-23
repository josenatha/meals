const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.utils');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		//! Array has errors

		const errorMsgs = errors.array().map(({ msg }) => msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const loginValidator = [];

const createRestaurantValidator = [
	body('name').notEmpty().withMessage('Invalid Name'),
	body('address').notEmpty().withMessage('Invalid Address'),
	body('rating').isNumeric().withMessage('Rating must be a Number'),
	checkResult,
];

const updateRestaurantValidator = [
	body('name').notEmpty().withMessage('Invalid Name'),
	body('address').notEmpty().withMessage('Invalid Address'),
	checkResult,
];

const createUserValidator = [
	body('name').notEmpty().withMessage('Invalid Name'),
	body('email').isEmail().withMessage('Invalid Email'),
	body('password')
		.isAlphanumeric()
		.withMessage('Password must be characters and number')
		.isLength({ min: 8 })
		.withMessage('Password must be a least 8 characters'),
	checkResult,
];

const updateUserValidator = [
	body('name').notEmpty().withMessage('Invalid Name'),
	body('email').isEmail().withMessage('Invalid Email'),
	checkResult,
];

const mealValidator = [
	body('name').notEmpty().withMessage('Invalid Name'),
	body('price').isNumeric().withMessage('Price must be numeric'),
	checkResult,
];

const reviewValidator = [];

module.exports = {
	createUserValidator,
	updateUserValidator,
	createRestaurantValidator,
	updateRestaurantValidator,
	mealValidator,
};
