// Models
const { Meal } = require('../models/Meal.model');
const { Restaurant } = require('../models/Restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllMeals = catchAsync(async (req, res) => {
	const meals = await Meal.findAll({
		where: { status: 'active' },
		attributes: ['id', 'name', 'price'],
		include: [{ model: Restaurant, attributes: ['id', 'name'] }],
	});

	res.status(200).json({
		status: 'Succes',
		meals,
	});
});

const getMealById = catchAsync(async (req, res) => {
	const { meal } = req;

	if (meal.status != 'active') {
		res.status(404).json({
			status: 'Meal Deleted',
		});
	}
	res.status(200).json({
		status: 'Succes',
		meal,
	});
});

const createMeal = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { name, price } = req.body;

	const newMeal = await Meal.create({ name, price, RestaurantId: Number(id) });

	res.status(201).json({
		status: 'Succes',
		newMeal,
	});
});

const updateMeal = catchAsync(async (req, res) => {
	const { meal } = req;
	const { name, price } = req.body;

	await meal.update({ name, price });

	res.status(200).json({
		status: 'Succes',
		msg: 'Meal Updated!!!',
	});
});

const deleteMeal = catchAsync(async (req, res) => {
	const { meal } = req;

	await meal.update({ status: 'inactive' });

	res.status(200).json({
		status: 'Succes',
		msg: 'Meal Deleted!!!',
	});
});

module.exports = {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
};
