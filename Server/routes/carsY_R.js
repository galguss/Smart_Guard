const express = require('express');
const router = express.Router();
const { addSlashes } = require('slashes');

const db = require('../models/dataBase');
const Cars = require('../models/carsY_M');

const sql = new Cars(db);

router.get('/List', async (req, res) => {
    try {
        const  ID  = addSlashes(req.query.Id);
        let carsNum = await sql.getAllCarNum(ID);
        res.status(200).json(carsNum);

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "oops!! Something went wrong"});
    }
});

router.post('/Add',async (req, res) => {
    try {
        const { Id, carNum } = req.body;
        const secureCarNum = addSlashes(carNum);

        if (isNaN(Id)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        let id = await sql.AddCar(Id, secureCarNum);
        res.status(200).json({message: `The addition was successful`, carNumber:{...req.body, approvals_id:id}});

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Add failed"});
    }
});

router.patch('/Edit',async (req,res) => {
    try {
        const { carNum, ApprovalsId } = req.body;
        const secureCarNum = addSlashes(carNum);

        if (isNaN(ApprovalsId)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.EditCar(ApprovalsId, secureCarNum);
        res.status(200).json({message: "The Edited was successful"})
        

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Edit failed"});
    }
});

router.delete('/Delete', async (req,res) => {
    try {
        const { id } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.DeleteCar(id);
        res.status(200).json({message: "The deletion was successful"})
        

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "The deletion failed"});
    }
})

module.exports = router;