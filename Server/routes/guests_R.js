const express = require('express');
const router = express.Router();

const db = require('../models/dataBase');
const Guests = require('../models/guests_M');

const sql = new Guests(db);

router.get('/List',async (req,res) => {
    try {
        const  ID  = req.query.Id;
        const guests = await sql.readAllGuests(ID);

        res.status(200).json(guests);
    } catch (error) {
        console.log(error);
    }
});

router.post('/Add', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdResident} = req.body;
        await sql.createGuest(LastName, Name, Phone, IdResident, CarNum);
    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit', async (req, res) => {
    try {
        const {LastName, Name, Phone, CarNum, IdGuest} = req.body;
        await sql.editGuest(IdGuest, CarNum,LastName, Name, Phone);

    } catch (error) {
        console.log(error);
    }
});

router.delete('/Delete', async (req,res) => {
    try {
        const {id} = req.body;
        await sql.deleteGuest(id);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;