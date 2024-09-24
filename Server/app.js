const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const checkAuth = require('./middlewares/checkAuth');
const adminCheckAuth = require('./middlewares/adminCheckAuth');

const app = express();
const HTTP_PORT = 4000;

dotenv.config();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(HTTP_PORT, () => {
    console.log(`The server is running on port: ${HTTP_PORT}`);
});

// global data
const tokens = [];

function decodeJwt(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); 
  
    const decoded = JSON.parse(jsonPayload); 
    return decoded;
}

app.use((req, res, next) => {
    req.tokens = tokens;
    req.decodeJwt = decodeJwt;
    next();
})

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