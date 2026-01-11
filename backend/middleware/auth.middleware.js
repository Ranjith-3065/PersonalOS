const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authtokendashboard = (req,res, next)=>{
    const token = req.cookies.token;
    if(!token){
        // return res.status(400).json({suceess:false,message:"login first"});
        req.user = null; 
        next();
    }
    else{
    const decodedtoken = jwt.verify(token,process.env.JWT);
    req.user = decodedtoken;
    next();
    }

}
exports.authtoken = (req,res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({suceess:false,message:"login first"});
        next();
    }
    else{
    const decodedtoken = jwt.verify(token,process.env.JWT);
    req.user = decodedtoken;
    next();
    }

}

