const express = require('express');
const router = express.Router();
const WebSocket = require('ws');
const axios = require('axios');
const Fs = require('fs');

const vehicleReception = require('../middlewares/vehicleReception');
const carInspection = require('../middlewares/carInspection');

const WS_PORT = 4050;
const distances = [];


const wsServer = new WebSocket.Server({port: WS_PORT}, () => console.log(`WS Server is listening at ${WS_PORT}`));

wsServer.on('connection', (ws,req) => {
    let newCar = {};
    console.log('Connected');
    let countMessage = 0;
    ws.on('message', data => {
        const timestamp = Date.now();
        
        if(countMessage % 2 === 0){
            newCar = {IDY:String(data)};
        }else{
            const imagePath = `./uploads/image_${timestamp}.jpg`;
            Fs.writeFileSync(imagePath, data);
            let date = new Date();
            let yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            let hour = date.getHours() < 10 ? '0'+ date.getHours() : date.getHours();
            let minute = date.getMinutes()<10 ? '0'+ date.getMinutes() : date.getMinutes();
            newCar = {...newCar, image:imagePath, date:`${dd}/${mm}/${yyyy}`,time: `${hour}:${minute}`};

            axios({
                method: 'POST',
                url:'http://localhost:4000/ESP/securing',
                data: newCar
            });
        }
        countMessage++;
    })
});

router.post('/securing', vehicleReception, carInspection, (req,res) => {
    console.log(`The car ${req.body.carNum} was tested successfully`);
})

router.get('/Change', (req, res) => {
    try {
        let index = req.query.IDY;
        distances[index] = req.query.VAL;
        console.log(req.Car);
        res.status(200).send("OK");
    } catch (error) {
        console.log(error);
        res.status(401).send("error");
    }
});

router.get('/Pull', (req, res) => {
    try {
        let index = req.query.IDY;
        res.status(200).send(distances[index]);
    } catch (error) {
        console.log(error);
        res.status(401).send("error");
    }
});

module.exports = router;