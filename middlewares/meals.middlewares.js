// Model
const { Meal } = require('../models/Meal.model');

// utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const mealExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const meal = await Meal.findOne({ where: { id } });

	if (!meal) {
		return next(new AppError('Meal Not Found', 404));
	}

	req.meal = meal;

	next();
});

module.exports = { mealExist };
