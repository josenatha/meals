const { db, DataTypes } = require('../utils/db.utils');

const User = db.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('active', 'inactive'),
		defaultValue: 'active',
	},
	role: {
		type: DataTypes.ENUM('normal', 'admin'),
		defaultValue: 'normal',
	},
});

module.exports = { User };
