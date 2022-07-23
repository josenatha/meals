const { app } = require('./app');

// Models
const { Restaurant } = require('./models/Restaurant.model');
const { Meal } = require('./models/Meal.model');
const { User } = require('./models/User.model');
const { Order } = require('./models/Order.model');
const { Review } = require('./models/Review.model');

// Utils
const { db } = require('./utils/db.utils'); //import DB

db.authenticate()
	.then(() => console.log('DataBase Autenticated'))
	.catch(err => console.log(err));

// Establish model's Relations
Restaurant.hasMany(Meal, { foreignKey: 'RestaurantId' });
Meal.belongsTo(Restaurant);

Restaurant.hasMany(Review, { foreignKey: 'RestaurantId' });
Review.belongsTo(Restaurant);

User.hasMany(Review, { foreignKey: 'UserId' });
Review.belongsTo(User);

User.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(User);

Meal.hasOne(Order, { foreignKey: 'MealId' });
Order.belongsTo(Meal);

db.sync()
	.then(() => console.log('DataBase Synced'))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server running on PORT:', PORT);
});
