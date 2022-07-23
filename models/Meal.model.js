const { db, DataTypes } = require('../utils/db.utils');

const Meal = db.define('Meal', {
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
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	RestaurantId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('active', 'inactive'),
		defaultValue: 'active',
	},
});

module.exports = { Meal };
