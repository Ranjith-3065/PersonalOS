const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
app.use(express.json());
app.use(mongoSanitize({ replaceWith: '_' }));
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
const tasksrouter = require('./routes/tasks.routes');
const errorHandler = require('./middleware/error.middleware');
app.use('/personalOS/dashboard',authmiddleware.authtokendashboard,(req,res)=>{
    console.log("requested:",req.user);
    res.render('dashboard/index',{
        title:'dashboard',
        scripts:['/js/dashboard.js'],
        styles:['/css/dashboard.css'],
        sidebar: 'dashboard',
        active: 'dashboard'
    });
})
app.use('/personalOS',authrouter);
app.use('/personalOS',authmiddleware.authtoken,seetingrouter);
app.use('/personalOS',authmiddleware.authtoken,tasksrouter);
app.use(errorHandler);
module.exports = app;
