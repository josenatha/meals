const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/User.model');
const { AppError } = require('../utils/appError.utils');

// utils
const { catchAsync } = require('../utils/catchAsync.utils');

dotenv.config({ path: './config.env' });

const getUser = catchAsync(async (req, res) => {
	const { user } = req;

	res.status(200).json({
		status: 'Succes',
		user,
	});
});

const getUsers = catchAsync(async (req, res) => {
	const users = await User.findAll({
		where: { status: 'active' },
		attributes: ['id', 'name', 'email', 'role'],
	});

	res.status(200).json({
		status: 'Succes',
		users,
	});
});

const createUser = catchAsync(async (req, res) => {
	const { name, email, password } = req.body;

	// hash password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({ name, email, password: hashPassword });

	// Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'Succes',
		newUser,
	});
});

const updateUser = catchAsync(async (req, res) => {
	const { user } = req;
	const { name, email } = req.body;

	await user.update({ name, email });

	res.status(200).json({
		status: 'succes',
		msg: 'User Updated!!!',
	});
});

const deleteUser = catchAsync(async (req, res) => {
	const { user } = req;

	await user.update({ status: 'inactive' });

	res.status(200).json({
		status: 'succes',
		msg: 'User Deleted!!!',
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email, status: 'active' } });

	if (!user) {
		next(new AppError('Credentails Invalid', 400));
	}

	const check = await bcrypt.compare(password, user.password);

	if (!check) {
		next(new AppError('Credentails Invalid', 400));
	}

	//Genetare JWT(JSON Web Token)
	const token = await jwt.sign(
		{ id: user.id, role: user.role },
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: '15m',
		}
	);
	

	res.status(200).json({
		status: 'Succes',
		token,
	});
});

module.exports = {
	createUser,
	updateUser,
	deleteUser,
	login,
	getUser,
	getUsers,
};
