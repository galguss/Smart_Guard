const express = require('express');
const router = express.Router();
const WebSocket = require('ws');
const axios = require('axios');

const WS_PORT = 4050;
const distances = [];

const wsServer = new WebSocket.Server({port: WS_PORT}, () => console.log(`WS Server is listening at ${WS_PORT}`));

wsServer.on('connection', (ws,req) => {
    console.log('Connected');

    ws.on('message', data => {
       /* const timestamp = Date.now();
        const imagePath = `./uploads/image_${timestamp}.jpg`;
        fs.writeFileSync(imagePath, data);*/
       
        ws.send("Welcome Gal");
    })
});

router.get('/Change', (req, res) => {
    try {
        let index = req.query.IDY;
        distances[index] = req.query.VAL;
        res.status(200).send("OK");
    } catch (error) {
        console.log(error);
    }
});

router.get('/Pull', (req, res) => {
    try {
        let index = req.query.IDY;
        res.status(200).send(distances[index]);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;