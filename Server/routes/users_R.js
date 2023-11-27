const express = require('express');

const db = require('../models/dataBase');
const Users = require('../models/users_M');

const router = express.Router();
const sql = new Users(db);

router.post('/signUp', async (req,res) => {
    try {
        const { YishuvCode, LastName, PhoneNumber, Email , Password} = req.body;
        await sql.register(YishuvCode, LastName, PhoneNumber, Email, Password);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;