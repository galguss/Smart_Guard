const jwt = require('jsonwebtoken');
const md5 = require('md5');

const checkAuth = (req, res, next) => {
    try {
        let Token = req.headers.authorization;
        let user = req.decodeJwt(Token);
        //const idAdmin = req.query.ID;
        /*if(!Token && idAdmin != 1){
            throw new Error();  
        } */ 
        jwt.verify(Token, process.env.JWT_KEY);

        
        if(req.tokens[1] == md5('SG' + user.email + "GK").substring(5,15))
            next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Auth failed"
        });
    }  
};

module.exports = checkAuth;