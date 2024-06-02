const express = require('express');
const md5 = require('md5');

const db = require('../models/dataBase');
const Users = require('../models/users_M');


const router = express.Router();
const sql = new Users(db);

router.post('/signUp', async (req,res) => {
    try {
        const { YishuvCode, LastName, PhoneNumber, Email , Password} = req.body;
        if(req.addSlashes(YishuvCode) && req.addSlashes(LastName) && req.addSlashes(PhoneNumber) && req.addSlashes(Email) && req.addSlashes(Password)){
            await sql.register(YishuvCode, LastName, PhoneNumber, Email, Password);
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`,
                token:""
            });
        }
    } catch (error) {
        res.status(401).json({error:error})
    }
})



router.post('/signIn', async (req,res) => {
    try {
        const { Email ,Password } = req.body;

        if(req.addSlashes(Password) && req.addSlashes(Email)){
            let user = await sql.login(Email, Password);
            req.tokens[user.id] =  md5('SG' + Email + "GK").substring(5,15);
            res.status(200).json(user);
        }else{
            res.status(401).json({
                message:`The use of characters ' or " are illegal`,
                token:""
            });
        }
    } catch (error) {
        res.status(401).json({error:error});
    }
})

module.exports = router;