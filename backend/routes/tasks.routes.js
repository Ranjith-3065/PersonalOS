const express = require('express');
const router = express.Router();

const taskscontroller = require('../controllers/tasks.controller');

router.get('/tasksdashboard',taskscontroller.gettasksdashboard);
router.post('/taskdashboardload',taskscontroller.posttasksdashboard);
router.get('/tasks/create',taskscontroller.gettaskscreate);
router.post('/tasks/create',taskscontroller.posttaskscreate);
router.post('/tasks/progress',taskscontroller)


module.exports = router;