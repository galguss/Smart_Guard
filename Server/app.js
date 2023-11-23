const express = require('express');
const webSocket = require('ws');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const HTTP_PORT = 4000;
const WS_PORT = 4050;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(HTTP_PORT, () => {
    console.log(`The server is running on port: ${HTTP_PORT}`);
});

app.get('/', (req,res) => {
    res.send('Hello World');
});