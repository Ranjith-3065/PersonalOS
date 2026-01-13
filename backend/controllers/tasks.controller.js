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

exports.gettaskscreate = (req,res)=>{
res.render('tasks/create',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/create.css','/css/settings/settings-sidebar.css'],
        scripts:['/js/tasks/index.js'],
        active: 'tasks',
        title:'tasks'
    });
}

exports.posttaskscreate = async(req,res)=>{
    const userid = req.user.id;
    const {title, discription} = req.body;
    const taskdetails = new tasks({id:userid,title:title,discription:discription});
    await taskdetails.save();

}