// Models
const { Review } = require('../models/Review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const createReview = catchAsync(async (req, res, next) => {
	const { sessionUser, restaurant } = req;
	const { comment, rating } = req.body;

	// const newReview = await Review.create({
	// 	comment,
	// 	rating,
	// 	UserId: sessionUser.id,
	// 	RestaurantId: restaurant.id,
	// });

	res.status(201).json({
		status: 'Succes',
		// newReview,
	});
});

const updateReview = catchAsync(async (req, res, next) => {
	const { review } = req;
	const { comment, rating } = req.body;

	await review.update({ comment, rating });

	res.status(200).json({
		status: 'succes',
		msg: 'Review Updated!!!',
	});
});

const deleteReview = catchAsync(async (req, res, next) => {
	const { review } = req;

	await review.update({ status: 'inactive' });

	res.status(200).json({
		status: 'succes',
		msg: 'Review Deleted!!!',
	});
});

module.exports = { createReview, updateReview, deleteReview };
