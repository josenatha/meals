const { Router } = require('express');

// Controllers
const {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
} = require('../controllers/meals.controllers');

// Middlewares
const { mealValidator } = require('../middlewares/validators.middleware');
const { mealExist } = require('../middlewares/meals.middlewares');
const { restaurantExist } = require('../middlewares/restaurants.middlewares');
const { protectSession, isAdmin } = require('../middlewares/auth.middlewares');

const mealRoutes = Router();

mealRoutes.get('/', getAllMeals);
mealRoutes.get('/:id', mealExist, getMealById);

mealRoutes.use(protectSession);

mealRoutes
	.use(mealExist, isAdmin)
	.route('/:id')
	.post(restaurantExist, mealValidator, createMeal)
	.patch(mealValidator, updateMeal)
	.delete(deleteMeal);

module.exports = { mealRoutes };
