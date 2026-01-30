const  express= require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');

//signup
router.get('/signup',authcontroller.getsignup);
router.post('/signup',authcontroller.postsignup);
//login
router.get('/login',authcontroller.getlogin);
router.post('/login',authcontroller.postlogin);


//forgotpass
router.get('/forgotpass',authcontroller.getforgotpass);
router.post('/resetpass',authcontroller.postresetpass);
router.get('/passwordreset/:token',authcontroller.getresetpass);
router.post('/passwordreset/:token',authcontroller.postresetpassword);
module.exports =router;