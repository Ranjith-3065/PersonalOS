const tasks = require('../models/Task.model');
const user = require('../models/User.model');

exports.gettasksdashboard = (req,res)=>{
    console.log('req url',req.url);
    res.render('tasks/index',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/index.css','/css/settings/settings-sidebar.css'],
        scripts:['/js/tasks/index.js'],
        active: 'tasks',
        title:'tasks'
    });
}

exports.posttaskscreate = async(req,res)=>{
    const userid = req.user.id;
}