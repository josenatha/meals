const { Router } = require('express');

// Controllers
const {
	getAllRestaurants,
	getRestaurantById,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
} = require('../controllers/restaurants.controllers');

// Middlewares
const {
	createRestaurantValidator,
	updateRestaurantValidator,
} = require('../middlewares/validators.middleware');
const { restaurantExist } = require('../middlewares/restaurants.middlewares');
const { protectSession, isAdmin } = require('../middlewares/auth.middlewares');

const restaurantRoutes = Router();

restaurantRoutes.get('/', getAllRestaurants);
restaurantRoutes.get('/:id', restaurantExist, getRestaurantById);

restaurantRoutes.use(protectSession);

restaurantRoutes.post(
	'/',
	isAdmin,
	createRestaurantValidator,
	createRestaurant
);

restaurantRoutes
	.use('/:id', restaurantExist)
	.route('/:id')
	.patch(isAdmin, updateRestaurantValidator, updateRestaurant)
	.delete(isAdmin, deleteRestaurant);

module.exports = { restaurantRoutes };
