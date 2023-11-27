const express = require('express');
const webSocket = require('ws');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
//var bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = 4000;
const WS_PORT = 4050;

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
app.use('/yishuvs', yishuvs);

const users = require('./routes/users_R');
app.use('/user', users);