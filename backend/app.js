const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.set('view engine','ejs');
const path = require('path');

app.set('views', path.join(__dirname, '../frontend/views'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

const authrouter = require('./routes/auth.routes');
const authmiddleware = require('./middleware/auth.middleware')
const seetingrouter = require('./routes/settings.routes');
app.use('/personalOS/dashboard',authmiddleware.authtoken,(req,res)=>{
    console.log("requested:",req.user);
    res.render('dashboard/index',{
        title:'dashboard',
        user:req.user,
        scripts:['/js/dashboard.js'],
        styles:['/css/dashboard.css']
    });
})
app.use('/personalOS',authrouter);
app.use('/personalOS',authmiddleware.authtoken,seetingrouter);
module.exports = app;
