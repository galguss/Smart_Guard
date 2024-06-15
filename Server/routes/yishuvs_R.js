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
        res.status(401).json({message: "oops!! Something went wrong"});
    }
});

router.post('/Add',async (req,res) => {
    try {
        const { Name } = req.body;
        if(req.addSlashes(Name)){
            let date = new Date();
            let code = md5("yis"+ date + "s") ;
            code = code.substring(0,6).toUpperCase();
            let id =await sql.createYishuv(Name, code)
            //console.log(id);
            let object = {Yishuv_id: id, Yishuv_name:Name, Yishuv_code:code};
            res.status(200).json({message: `The addition was successful. The Yishuvs code is: ${code}`, yishuv: object});
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

router.patch('/Edit',async (req,res) =>{
    try {
        const { Name, ID } = req.body;
        if(req.addSlashes(Name) && req.addSlashes(ID)){
            await sql.editYishuv(Name, ID);
            res.status(200).json({message: "The Edited was successful", yishuv:{Yishuv_id:ID}})
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

router.delete('/Delete',async (req, res) =>{
    try {
        const { id } = req.body;
        if(req.addSlashes(id)){
            await sql.DeleteYishuv(id);
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