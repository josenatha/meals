const { Router } = require('express');

// Controllers
const {
	createUser,
	updateUser,
	deleteUser,
	login,
	getUser,
	getUsers,
} = require('../controllers/users.controllers');

// Middlewares
const {
	createUserValidator,
	updateUserValidator,
} = require('../middlewares/validators.middleware');
const { userExist } = require('../middlewares/users.middlewares');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middlewares');

const userRoutes = Router();

userRoutes.post('/signup', createUserValidator, createUser);
userRoutes.post('/login', login);

userRoutes.get('/:id', getUser);
userRoutes.get('/', getUsers);

userRoutes
	.use('/:id', protectSession, userExist, protectUserAccount)
	.route('/:id')
	.patch(updateUserValidator, updateUser)
	.delete(deleteUser);

module.exports = { userRoutes };
