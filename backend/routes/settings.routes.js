const express = require('express');
const router = express.Router();

const settingscontroller = require('../controllers/settings.controller');
router.get('/profile',settingscontroller.getprofile);
router.get('/profile/data',settingscontroller.getprofiledata);
router.get('/account',settingscontroller.getaccount);
router.get('/preferences',settingscontroller.getpreferences);

router.patch('/profile/updatedata',settingscontroller.patchprofile);

module.exports = router;