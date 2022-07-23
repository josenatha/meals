const express = require('express');

// Routers
const { userRoutes } = require('./routes/users.routes');
const { restaurantRoutes } = require('./routes/restaurants.routes');
const { reviewsRoutes } = require('./routes/reviews.routes');
const { mealRoutes } = require('./routes/meals.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError.utils');

//init expres app
const app = express();

app.use(express.json());

// Define endpoints
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/restaurants/reviews', reviewsRoutes);
app.use('/api/v1/meals', mealRoutes);

// handle incomnig unknow routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this Server`,
			404
		)
	);
});

// global error handler
app.use(globalErrorHandler);

module.exports = { app };
