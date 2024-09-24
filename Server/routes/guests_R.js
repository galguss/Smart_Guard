const express = require('express');
const router = express.Router();
const { addSlashes } = require('slashes');

const db = require('../models/dataBase');
const Guests = require('../models/guests_M');

const sql = new Guests(db);

router.get('/List',async (req,res) => {
    try {
        const  ID  = addSlashes(req.query.Id);
        const guests = await sql.readAllGuests(ID);
        res.status(200).json(guests);
      
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "oops!! Something went wrong"});
    }
});

router.post('/Add', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdResident} = req.body;
        const secureLastName = addSlashes(LastName);
        const secureName = addSlashes(Name);
        const securePhone = addSlashes(Phone);

        if (isNaN(CarNum) || isNaN(IdResident)) {
            return res.status(400).json({message : 'Invalid number'});
        }
    
       let id = await sql.createGuest(secureLastName, secureName, securePhone, IdResident, CarNum);
        res.status(200).json({message: `The addition was successful`, guest:{...req.body,guest_id:id}});

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Add failed"});
    }
});

router.patch('/Edit', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdGuest} = req.body;
        const secureLastName = addSlashes(LastName);
        const secureName = addSlashes(Name);
        const securePhone = addSlashes(Phone);

        if (isNaN(CarNum) || isNaN(IdGuest)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.editGuest(IdGuest, CarNum, secureLastName, secureName, securePhone);
        res.status(200).json({message: "The Edited was successful"});
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Edit failed"});
    }
});

router.delete('/Delete', async (req,res) => {
    try {
        const {id} = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.deleteGuest(id);
        res.status(200).json({message: "The deletion was successful"})
      
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "The deletion failed"});
    }
});
module.exports = router;