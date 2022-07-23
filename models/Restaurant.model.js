const { db, DataTypes } = require('../utils/db.utils');

const Restaurant = db.define('Restaurant', {
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
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM('active', 'inactive'),
		defaultValue: 'active',
	},
});

module.exports = { Restaurant };
