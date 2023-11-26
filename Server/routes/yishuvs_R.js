const express = require('express');
const md5 = require('md5');

const db = require('../models/dataBase');
const Yishuvs = require('../models/yishuvs_M');

const router = express.Router();
const sql = new Yishuvs(db);

router.get('/List', async (req, res) => {
    try {
        const [list, _] = await sql.readAllYishuvs();
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
});

router.post('/Add',async (req,res) => {
    try {
        const { Name } = req.body;
        let date = new Date();
        let code = md5("yis"+ date + "s") ;
        code = code.substring(0,6).toUpperCase();
        await sql.createYishuv(Name, code);
        res.status(200).json({code:code});

    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit',async (req,res) =>{
    try {
        const { Name, ID } = req.body;
        await sql.editYishuv(Name, ID);

    } catch (error) {
        console.log(error);
    }
});

router.delete('/Delete',async (req, res) =>{
    try {
        const { id } = req.body;
        await sql.DeleteYishuv(id);

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;