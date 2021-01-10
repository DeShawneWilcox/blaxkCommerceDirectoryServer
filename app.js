require('dotenv').config();
let Express = require('express');
let app = Express();

let sequelize = require('./db');
// sequelize.sync({force: true}); // to clear all tables on the local device ---> last resort

sequelize.sync();

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use(Express.static(__dirname + '/public'));

app.get('/', (request, response) => response.render ('index'));

const userController = require('./controllers/userController')
app.use('/user', userController)

const businessController = require('./controllers/businessController')
app.use('/business', businessController)

const reviewController = require('./controllers/reviewController')
app.use('/review', reviewController)

const eventController = require('./controllers/eventController')
app.use('/event', eventController)




app.listen(process.env.PORT, () => console.log(`The App is listening on port number: ${process.env.PORT}`));

