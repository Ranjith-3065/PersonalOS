const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habits.controller');

router.get('/habitsDashboard',habitController.getHabitsDashboard);
router.get('/habits/create',habitController.getCreateHabits);
router.post('/habits/create',habitController.postCreateHabits);

module.exports = router