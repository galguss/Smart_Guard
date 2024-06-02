const express = require('express');
const router = express.Router();

const db = require('../models/dataBase');
const Guests = require('../models/guests_M');

const sql = new Guests(db);

router.get('/List',async (req,res) => {
    try {
        const  ID  = req.query.Id;
        if(req.addSlashes(ID)){
            const guests = await sql.readAllGuests(ID);
            res.status(200).json(guests);
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

router.post('/Add', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdResident} = req.body;
        if(req.addSlashes(LastName) && req.addSlashes(Name) && req.addSlashes(CarNum) && req.addSlashes(Phone) && req.addSlashes(IdResident)){
            await sql.createGuest(LastName, Name, Phone, IdResident, CarNum);
            res.status(200).json({message: `The addition was successful`});
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

router.patch('/Edit', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdGuest} = req.body;
        if(req.addSlashes(LastName) && req.addSlashes(Name) && req.addSlashes(CarNum) && req.addSlashes(Phone) && req.addSlashes(IdGuest)){
            await sql.editGuest(IdGuest, CarNum,LastName, Name, Phone);
            res.status(200).json({message: "The Edited was successful"});
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
        const {id} = req.body;
        if(req.addSlashes(id)){
            await sql.deleteGuest(id);
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
});
module.exports = router;