const axios = require('axios');
const fs = require('fs');
const FormData = require("form-data");

const db = require('../models/dataBase');
const Esp = require('../models/esp_M');

const sql = new Esp(db);

const vehicleReception = async (req,res,next) => {
    try {
        const { image } = req.body;
        const formData = new FormData();
        formData.append('upload', fs.createReadStream(image));
        let carNumber = await axios({
            method:'POST',
            url: 'https://api.platerecognizer.com/v1/plate-reader',
            data: formData,
            headers: {
                'Authorization': 'Token 8d96d636bbbe9c93d4da630a234b90ae25ccdaac'
            }
        });

        carNumber = carNumber['data'].results[0].plate;
        sql.saveCars(req.body, carNumber);
        
        req.body = { ...req.body, carNum:carNumber };
        req.sql = sql;
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = vehicleReception;