const express = require('express');
const router = express.Router();

const db = require('../models/dataBase');
const Cars = require('../models/carsY_M');

const sql = new Cars(db);

router.get('/List', async (req, res) => {
    try {
        const  ID  = req.query.Id;
        let carsNum = await sql.getAllCarNum(ID);
        res.status(200).json(carsNum);
    } catch (error) {
        console.log(error);
    }
});

router.post('/Add',async (req, res) => {
    try {
        const { Id, carNum } = req.body;
        await sql.AddCar(Id, carNum);

    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit',async (req,res) => {
    try {
        const { carNum, ApprovalsId } = req.body;
        await sql.EditCar(ApprovalsId, carNum);

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;