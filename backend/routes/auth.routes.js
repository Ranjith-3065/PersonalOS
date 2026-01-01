const  express= require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth.controller');


router.get('/signup',authcontroller.getsignup);
router.post('/signup',authcontroller.postsignup);
router.get('/login',authcontroller.getlogin);
router.post('/login',authcontroller.postlogin);
router.get('/forgotpass',authcontroller.getforgotpass);
router.post('/resetpass',authcontroller.postresetpass);
router.get('/passwordreset',authcontroller.getresetpass);

module.exports =router;