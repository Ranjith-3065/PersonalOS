const user = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');


const { signupSchema, loginSchema, resetpassSchema, resetpasswordSchema }  = require('../config/zod');
const {sendmaillink} = require('../services/settings.service');
const TryCatch = require('../middleware/tryCatch.middleware');
const AppError = require('../utils/apperror');


dotenv.config();
// signup
exports.getsignup = TryCatch((req,res)=>{
    console.log("url",req.url);
    res.render('auth/signup',{
        layout:'layouts/auth',
        title:'signup',
        subtitle:'signup'
    });
    
    
})
exports.postsignup = TryCatch(async (req,res)=>{
    console.log('url of post',req.url);
    
    const { name, email, password } = signupSchema.parse(req.body);

    const existuser = await user.findOne({email});
    if (existuser) {
        throw new AppError("Email already exists", 400);
    }
    else{
        const haspassword = await bcrypt.hash(password,10);
        const newuser = new user({name,email,password:haspassword});
        await newuser.save();
        console.log("registered");
        return res.status(200).json({success:true, message: "You registered" });
    }
})

//login
exports.getlogin = TryCatch((req,res)=>{
    console.log("url",req.url);
    res.render('auth/login',{
        layout:'layouts/auth',
        title:'login',
        subtitle:'login'
    });
})
exports.postlogin = TryCatch(async (req,res)=>{

   const { email, password } = loginSchema.parse(req.body);
    const userexist = await user.findOne({email}).select("+password");
    console.log(userexist);
    if(userexist){
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
            throw new AppError("Incorrect email or password", 400);
        }
    }
    else{
        throw new AppError("Incorrect email or password", 400);
    }
    
})
//forgotpass
exports.getforgotpass = TryCatch((req,res)=>{
    console.log('url',req.url);
res.render('auth/forgotPassword',{
    layout:'layouts/auth',
        title:'frogotpassword',
        subtitle:'forgotpassword'
});
})
exports.postresetpass = TryCatch(async(req,res)=>{
    const {email} = resetpassSchema.parse(req.body);
    const usertoken = await user.findOne({email});

    if(!usertoken){
        return res.status(200).json({success:true});
    }

    const token = crypto.randomBytes(32).toString('hex');

    usertoken.tokenforreset = token;
    usertoken.tokenExpiry = Date.now() + 15 * 60 * 1000;
    await usertoken.save();

    const link = `http://localhost:3000/personalOS/passwordreset/${token}`;
    await sendmaillink(email,link);

    return res.status(200).json({success:true});
})

exports.getresetpass = TryCatch( (req,res)=>{
    res.render('auth/passwordreset',{
        layout:'layouts/auth',
        title:'passwordreset',
        subtitle:'passwordreset'
    });
})


exports.postresetpassword = TryCatch( async(req,res)=>{
    const {password} = resetpasswordSchema.parse(req.body);
    const {token} = req.params;

    const userdetails = await user.findOne({
        tokenforreset: token,
        tokenExpiry: { $gt: Date.now() }
    });

    if(!userdetails){
        throw new AppError("Invalid or expired link", 400);
    }

    const haspassword = await bcrypt.hash(password,10);
    userdetails.password = haspassword;

    // destroy token after use
    userdetails.tokenforreset = undefined;
    userdetails.tokenExpiry = undefined;

    await userdetails.save();
    res.status(200).json({success:true});
})


