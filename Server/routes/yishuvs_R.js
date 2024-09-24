const express = require('express');
const md5 = require('md5');
const { addSlashes } = require('slashes');

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
        res.status(401).json({message: "oops!! Something went wrong"});
    }
});

router.post('/Add',async (req,res) => {
    try {
        const { Name } = req.body;
        const secureName = addSlashes(Name);
        let date = new Date();
        let code = md5("yis"+ date + "s") ;
        code = code.substring(0,6).toUpperCase();
        let id =await sql.createYishuv(secureName, code)
        let object = {Yishuv_id: id, Yishuv_name:Name, Yishuv_code:code};
        res.status(200).json({message: `The addition was successful. The Yishuvs code is: ${code}`, yishuv: object});
       
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Add failed"});
    }
});

router.patch('/Edit',async (req,res) =>{
    try {
        const { Name, ID } = req.body;
        const secureName = addSlashes(Name);

        if (isNaN(ID)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.editYishuv(secureName, ID);
         res.status(200).json({message: "The Edited was successful", yishuv:{Yishuv_id:ID}})

    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Edit failed"});
    }
});

router.delete('/Delete',async (req, res) =>{
    try {
        const { id } = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({message : 'Invalid number'});
        }

        await sql.DeleteYishuv(id);
        res.status(200).json({message: "The deletion was successful"})
       
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "The deletion failed"});
    }
})

module.exports = router;