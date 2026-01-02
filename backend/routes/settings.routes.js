const express = require('express');
const router = express.Router();

const settingscontroller = require('../controllers/settings.controller');

//setings route
router.get('/profile',settingscontroller.getprofile);
router.get('/account',settingscontroller.getaccount);
router.get('/preferences',settingscontroller.getpreferences);

//settings/profile route
router.get('/profile/data',settingscontroller.getprofiledata);
router.patch('/profile/updatedata',settingscontroller.patchprofile);

//settings/account route
router.patch('/account/updatedata',settingscontroller.patchaccount);
router.patch('/account/otp',settingscontroller.patchotp);


module.exports = router;