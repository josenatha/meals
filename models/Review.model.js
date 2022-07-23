const { db, DataTypes } = require('../utils/db.utils');

const Review = db.define('Review', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	UserId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
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

module.exports = { Review };
