const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const {JWT_SECRET}=require('../keys')
const reqauth = (req,res,next)=>{
    const token = req.cookies.nitmun;
    if(token){
        jwt.verify(token,JWT_SECRET ,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                // res.redirect('/login');
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }
    else{
        // res.redirect('/login')
    }
}
const checkuser = (req,res,next)=>{
     const token = req.cookies.nitmun;
     if(token){
        jwt.verify(token,JWT_SECRET,async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken)
                let user = await Admin.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();
    }
}
module.exports = { reqauth,checkuser};