// Models
const { Restaurant } = require('../models/Restaurant.model');

// utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const restaurantExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const restaurant = await Restaurant.findOne({ where: { id } });

	if (!restaurant) {
		return next(new AppError('Restaurant not found', 404));
	}

	req.restaurant = restaurant;

	next();
});

const restaurantReviewed = catchAsync(async (req, res, next) => {
	const { restaurantId } = req.params;

	const restaurant = await Restaurant.findOne({
		where: { id: restaurantId },
	});

	if (!restaurant) {
		return next(new AppError('Restaurant not found', 404));
	}

	req.restaurant = restaurant;

	next();
});

module.exports = { restaurantExist, restaurantReviewed };
