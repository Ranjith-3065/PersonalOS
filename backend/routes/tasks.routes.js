const express = require('express');
const router = express.Router();

const taskscontroller = require('../controllers/tasks.controller');

router.get('/tasksdashboard',taskscontroller.gettasksdashboard);
router.get('/tasks/create',taskscontroller.gettaskscreate);
// router.post('/taskscreate')



module.exports = router;