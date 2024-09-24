const express = require('express');
const { addSlashes } = require('slashes');
const md5 = require('md5');

const db = require('../models/dataBase');
const Users = require('../models/users_M');


const router = express.Router();
const sql = new Users(db);

router.post('/signUp', async (req,res) => {
    try {
        const { YishuvCode, LastName, PhoneNumber, Email , Password} = req.body;
        const secureYishuvCode = addSlashes(YishuvCode);
        const secureLastName = addSlashes(LastName);
        const securePhoneNumber = addSlashes(PhoneNumber);
        const secureEmail = addSlashes(Email);
        const securePassword = addSlashes(Password);

        await sql.register(secureYishuvCode, secureLastName, securePhoneNumber, secureEmail, securePassword);
    } catch (error) {
        res.status(401).json({error:error})
    }
})



router.post('/signIn', async (req,res) => {
    try {
        const { Email ,Password } = req.body;
        const secureEmail = addSlashes(Email);
        const securePassword = addSlashes(Password);

        let user = await sql.login(secureEmail, securePassword);
        req.tokens[user.id] =  md5('SG' + Email + "GK").substring(5,15);
        res.status(200).json(user);
       
    } catch (error) {
        res.status(401).json({error:error});
    }
})

module.exports = router;