const Sequelize = require('sequelize');
const sequelize = new Sequelize( process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.authenticate()
.then(() => console.log('Connected to blaxk-commerce-directory postgres database!'))
.catch(err => console.log(err));

const User = sequelize.import('./models/user')
const Business = sequelize.import('./models/business')
const Review = sequelize.import('./models/review')
const Event = sequelize.import('./models/event')

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Business)
Business.belongsTo(User)

User.hasMany(Event)
Event.belongsTo(User)

// Business.hasMany(Event)
// Event.belongsTo(Business)

Business.hasMany(Review)
Review.belongsTo(Business)

module.exports = sequelize;



