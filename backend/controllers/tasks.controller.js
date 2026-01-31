const tasks = require('../models/Task.model');
const user = require('../models/User.model');

// dashboard

exports.gettasksdashboard = (req,res)=>{
    console.log('req url',req.url);
    res.render('tasks/index',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/index.css','/css/tasks/tasks-sidebar.css'],
        scripts:['/js/tasks/index.js','js/settings/main.js'],
        active: 'dashboard',
        title:'tasks dashboard'
    });
}

exports.posttasksdashboard = async(req,res)=>{
    const userid = req.user.id;
    // here i need make like fetch all the task of the user not one so i need use find and array method in the frontend remember
    const taskdetails = await tasks.find({ userId: userid,}).sort({ status: -1 });
    total = taskdetails.length;
    // then send the json data also changes 
    res.status(200).json({success:true,
        taskdetails,total});
}


// create

exports.gettaskscreate = (req,res)=>{
res.render('tasks/create',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/create.css','/css/settings/settings-sidebar.css'],
        scripts:['/js/tasks/index.js','js/settings/main.js'],
        active: 'tasks',
        title:'tasks'
    });
}

exports.posttaskscreate = async(req,res)=>{
    const userid = req.user.id;
    console.log(req.body);
    const {title, description,status,priority,category,dueDate,estimatedTime} = req.body;
    const taskdetails = new tasks({userId:userid,title, description,status,priority,category,dueDate,estimatedTime});
    await taskdetails.save();
    res.redirect('back');
}


// tasks of today upcoming and completed

exports.gettaskstoday = (req,res)=>{
    res.render('tasks/today',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/today.css','/css/tasks/tasks-sidebar.css'],
        scripts:['js/settings/main.js'],
        active: 'today',
        title:'Today tasks'
    });
}


exports.posttaskprogresstoday = async(req,res)=>{
   const userid = req.user.id;
   const start = new Date();
   start.setHours(0,0,0,0);
   const end = new Date();
   end.setHours(23, 59, 59, 999);
   const taksdetails = await tasks.find({userId:userid,dueDate:{$gt:start,$lt:end}});
    res.status(200).json({success:true,taksdetails});
}


exports.gettasksupcoming = (req,res)=>{
    res.render('tasks/upcoming',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/upcoming.css','/css/tasks/tasks-sidebar.css'],
        scripts:['js/settings/main.js'],
        active: 'upcoming',
        title:'upcoming tasks'
    });
}

exports.posttaskprogressupcoming = async(req,res)=>{
    const userid = req.user.id;
    const end = new Date();
    end.setHours(23, 59, 59, 999);
   const taksdetails = await tasks.find({userId:userid,dueDate:{$gt:end},status:{$ne:'completed'}});
   console.log(taksdetails);
    res.status(200).json({success:true,taksdetails});
}


exports.gettaskscompleted = (req,res)=>{
    res.render('tasks/completed',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/completed.css','/css/tasks/tasks-sidebar.css'],
        scripts:['js/settings/main.js'],
        active: 'compketed',
        title:'Compketed tasks'
    });
}

exports.posttaskprogresscompleted = async(req,res)=>{
    const userid = req.user.id;
    const taksdetails = await tasks.find({userId:userid,status:{$eq:'completed'}});
    res.status(200).json({success:true,taksdetails});
}

exports.posttaskscompleted = async(req,res)=>{
    const userid = req.user.id;
    const {taskId,actualtime} = req.body;
    const taksdetails = await tasks.findOne({userId:userid,_id:taskId});
    taksdetails.actualTime = actualtime;
    taksdetails.status = 'completed';
    taksdetails.completedAt = new Date();
    await taksdetails.save();
    res.json({ success: true });
}