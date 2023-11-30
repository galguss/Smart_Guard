const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        let Token = req.headers.authorization;
        if(!Token){
            throw new Error();  
        }  
        jwt.verify(Token, process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Auth failed"
        });
    }  
};

module.exports = checkAuth;