const jwt=require('jsonwebtoken');
const { JWT_SECRECT } = require('../config/env.config');


const authUser=(req, res, next)=>{
    const token=req.header('Authorization')?.replace('Bearer ', '');;
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try{    
        const decoded=jwt.verify(token, JWT_SECRECT);
        req.user=decoded.user;
        next();
    }catch(error){
        res.status(401).json({message: 'Token is not valid'});
    }
};

module.exports=authUser