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

router.post('/signIn', async (req,res) => {
    try {
        const { Email ,Password } = req.body;
        let user = await sql.login(Email, Password);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;