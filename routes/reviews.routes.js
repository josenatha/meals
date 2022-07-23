const { Router } = require('express');

// controllers
const {
	createReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviews.controllers');

// Middlewares
const {
	restaurantReviewed,
} = require('../middlewares/restaurants.middlewares');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middlewares');

const reviewsRoutes = Router();

reviewsRoutes.use(protectSession);

reviewsRoutes.post('/:restaurantId', createReview);

module.exports = { reviewsRoutes };
