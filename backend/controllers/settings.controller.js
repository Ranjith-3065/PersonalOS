const user = require('../models/User.model');
const {settingsService, sendmail} = require('../services/settings.service')
exports.getprofile = (req,res)=>{
    console.log('url',req.url);
    res.render('settings/profile');
}

exports.getaccount = (req,res)=>{
    console.log('url',req.url);
    res.render('settings/account');
}
exports.getpreferences = (req,res)=>{
    console.log('url',req.url);
    res.render('settings/preferences');
}

exports.getprofiledata = async (req,res)=>{
    console.log('url',req.url);
    const userid = req.user.id;
    const uservalue  = await user.findById(userid);
    const name = uservalue.name;
    const email = uservalue.email;
    return res.status(200).json({success:true,name:name,email:email,username:uservalue.username,bio:uservalue.bio,timezone:uservalue.timezone,Verified:uservalue.isVerified});
}

exports.patchprofile = async (req,res)=>{
    const userid = req.user.id;
    const uservalue  = await user.findById(userid);

    const{name, username,bio,timezone}  = req.body;
    if (name !== undefined) uservalue.name = name;
    if (username !== undefined) uservalue.username = username;
    if (bio !== undefined) uservalue.bio = bio;
    if (timezone !== undefined) uservalue.timezone = timezone;
    await uservalue.save();
    return res.status(200).json({success:true,name:uservalue.name,username:uservalue.username,bio:uservalue.bio,timezone:uservalue.timezone,})
    
}

exports.patchaccount = async (req,res)=>{

    const userid = req.user.id;
    const userdetails = await user.findById(userid);
    const useremail = userdetails.email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    userdetails.otp = otp;
    await userdetails.save();
    await sendmail(useremail, otp);
    return res.status(200).json({success:true});

}
exports.patchotp = async (req,res)=>{
    const {od} = req.body;
    const userid = req.user.id;
    const userdetails = await user.findById(userid);
    console.log("data",od);
    if(userdetails.otp == od){
        userdetails.isVerified = true;
        await userdetails.save();
    }
    return res.status(200).json({success:true,Verified:true});
}
