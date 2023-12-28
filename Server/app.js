const express = require('express');
//const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
//const bodyParser = require('body-parser');

const checkAuth = require('./middlewares/checkAuth');
const adminCheckAuth = require('./middlewares/adminCheckAuth');

const app = express();
const HTTP_PORT = 4000;

dotenv.config();

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(HTTP_PORT, () => {
    console.log(`The server is running on port: ${HTTP_PORT}`);
});

app.get('/', (req,res) => {
    res.send('Hello World');
});

const yishuvs = require('./routes/yishuvs_R');
app.use('/yishuvs', adminCheckAuth, yishuvs);

const users = require('./routes/users_R');
app.use('/user', users);

const LocalCars = require('./routes/carsY_R');
app.use('/LocalCars', checkAuth, LocalCars);

const guests = require('./routes/guests_R');
app.use('/guests', checkAuth, guests);

const esp = require('./routes/esp_R');
app.use('/ESP', esp);