const express = require('express');
const router = express.Router();

const taskscontroller = require('../controllers/tasks.controller');


// dashboard router
router.get('/tasksdashboard',taskscontroller.gettasksdashboard);
router.post('/taskdashboardload',taskscontroller.posttasksdashboard);


// task create router
router.get('/tasks/create',taskscontroller.gettaskscreate);
router.post('/tasks/create',taskscontroller.posttaskscreate);

// task progress router 
router.get('/tasks/today',taskscontroller.gettaskstoday);
router.post('/tasks/progress/today',taskscontroller.posttaskprogresstoday);

//
router.get('/tasks/upcoming',taskscontroller.gettasksupcoming);
router.post('/tasks/progress/upcoming',taskscontroller.posttaskprogressupcoming);

//
router.get('/tasks/completed',taskscontroller.gettaskscompleted);
router.post('/tasks/progress/completed',taskscontroller.posttaskprogresscompleted);


module.exports = router;