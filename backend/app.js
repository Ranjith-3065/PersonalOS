const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
const path = require('path');

app.set('views', path.join(__dirname, '../frontend/views'));


const authrouter = require('./routes/auth.routes');
const authmiddleware = require('./middleware/auth.middleware')
const seetingrouter = require('./routes/settings.routes');
app.use('/personalOS/dashboard',authmiddleware.authtoken,(req,res)=>{
    console.log("requested:",req.user);
    res.render('dashboard/index');
})
app.use('/personalOS',authrouter);
app.use('/personalOS',authmiddleware.authtoken,seetingrouter);
module.exports = app;
