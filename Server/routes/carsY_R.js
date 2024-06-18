const express = require('express');
const router = express.Router();

const db = require('../models/dataBase');
const Cars = require('../models/carsY_M');

const sql = new Cars(db);

router.get('/List', async (req, res) => {
    try {
        const  ID  = req.query.Id;
        if(req.addSlashes(ID)){
            let carsNum = await sql.getAllCarNum(ID);
            res.status(200).json(carsNum);
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "oops!! Something went wrong"});
    }
});

router.post('/Add',async (req, res) => {
    try {
        const { Id, carNum } = req.body;
        if(req.addSlashes(Id) && req.addSlashes(carNum)){
            let id = await sql.AddCar(Id, carNum);
            res.status(200).json({message: `The addition was successful`, carNumber:{...req.body, approvals_id:id}});
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Add failed"});
    }
});

router.patch('/Edit',async (req,res) => {
    try {
        const { carNum, ApprovalsId } = req.body;
        if(req.addSlashes(ApprovalsId) && req.addSlashes(carNum)){
            await sql.EditCar(ApprovalsId, carNum);
            res.status(200).json({message: "The Edited was successful"})
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Edit failed"});
    }
});

router.delete('/Delete', async (req,res) => {
    try {
        const { id } = req.body;
        if(req.addSlashes(id)){
            await sql.DeleteCar(id);
            res.status(200).json({message: "The deletion was successful"})
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "The deletion failed"});
    }
})

module.exports = router;