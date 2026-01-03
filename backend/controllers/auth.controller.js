
const user = require('../models/User.model');
const {sendmaillink} = require('../services/settings.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// signup
exports.getsignup = (req,res)=>{
    console.log("url",req.url);
    res.render('auth/signup');
}
exports.postsignup = async (req,res)=>{
    console.log('url of post',req.url);

    const {name,email,password} = req.body;
    const existuser = await user.findOne({email});
    if(existuser){
        return res.status(400).json({success:false,message:"these email already exists"});
    }
    else{
        const haspassword = await bcrypt.hash(password,10);
        const newuser = new user({name,email,password:haspassword});
        await newuser.save();
        console.log("registered");
        return res.status(200).json({success:true, message: "You registered" });
    }
}

//login
exports.getlogin = (req,res)=>{
    console.log("url",req.url);
    res.render('auth/login');
}
exports.postlogin = async (req,res)=>{
    const {email,password} = req.body;
    const userexist = await user.findOne({email}).select("+password");
    console.log(userexist);
    if(userexist){
        console.log('pass1',userexist.password);
        console.log('pass2',password);
        const ismatch = await bcrypt.compare(password , userexist.password);
        if(ismatch){

        const token = jwt.sign(
        {id:userexist._id,role:userexist.role}, process.env.JWT,
        { expiresIn: "7d" }
        );
        res.cookie("token", token, {
        httpOnly: true,       
        secure: false,         
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
        });
            return res.status(200).json({success:true,message:"You logged in"});

        }

        else{
            return res.status(400).json({success : false , message:"Incorrect email or password"});
        }
    }
    else{
        return res.status(400).json({success : false, message:"Incorrect email or password"});
    }
    
}
//forgotpass
exports.getforgotpass = (req,res)=>{
    console.log('url',req.url);
    res.render('auth/forgotPassword');
}
exports.postresetpass = async(req,res)=>{
    console.log('i came here');
    const {email} = req.body;
    const token = 'hi1234';
    const usertoken = await user.findOne({email});
    usertoken.tokenforreset = token;
    await usertoken.save();

    const link = `http://localhost:3000/personalOS/passwordreset/${token}`;
    await sendmaillink(email,link);
    return res.status(200).json({success:true,token});

}
exports.getresetpass = (req,res)=>{
    res.render('auth/passwordreset');
}


exports.postresetpassword = async(req,res)=>{
    const {password} = req.body;
    const {token} = req.params;
    const userdetails = await user.findOne({tokenforreset:token}).select("+password");
        //hash madbek
        userdetails.password = password;
        await userdetails.save();
        res.status(200).json({success:true});

}
