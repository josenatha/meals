// Models
const { Restaurant } = require('../models/Restaurant.model');
const { Meal } = require('../models/Meal.model');
const { Review } = require('../models/Review.model');

// utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllRestaurants = catchAsync(async (req, res) => {
	const restaurants = await Restaurant.findAll({
		where: { status: 'active' },
		attributes: ['id', 'name', 'address', 'rating'],
		include: [
			{ model: Meal, attributes: ['id', 'name', 'price'] },
			{ model: Review },
		],
	});

	res.status(200).json({
		status: 'succes',
		restaurants,
	});
});

const getRestaurantById = catchAsync(async (req, res) => {
	const { restaurant } = req;

	res.status(200).json({
		status: 'Succes',
		restaurant,
	});
});

const createRestaurant = catchAsync(async (req, res) => {
	const { name, address, rating } = req.body;

	const newRestaurant = await Restaurant.create({ name, address, rating });

	res.status(201).json({
		status: 'Succes',
		newRestaurant,
	});
});

const updateRestaurant = catchAsync(async (req, res, next) => {
	const { restaurant } = req;
	const { name, address } = req.body;

	await restaurant.update({ name, address });

	res.status(200).json({
		status: 'succes',
		msg: 'Restaurant Updated!!!',
	});
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
	const { restaurant } = req;

	await restaurant.update({ status: 'inactive' });

	res.status(200).json({
		status: 'succes',
		msg: 'Restaurant Deleted!!!',
	});
});

module.exports = {
	getAllRestaurants,
	getRestaurantById,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
};
