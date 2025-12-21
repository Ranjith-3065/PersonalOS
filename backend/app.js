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

app.use('/dashboard',(req,res)=>{
    console.log("requested:",req.url);
    res.render('dashboard/index');
})
app.use('/',authrouter);

module.exports = app;
