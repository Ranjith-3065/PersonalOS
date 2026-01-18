const tasks = require('../models/Task.model');
const user = require('../models/User.model');

// dashboard

exports.gettasksdashboard = (req,res)=>{
    console.log('req url',req.url);
    res.render('tasks/index',{
        layout : 'layouts/tasks',
        sidebar: 'tasks',
        styles : ['/css/tasks/index.css','/css/tasks/tasks-sidebar.css'],
        scripts:['/js/tasks/index.js'],
        active: 'dashboard',
        title:'tasks dashboard'
    });
}

exports.posttasksdashboard = async(req,res)=>{
    const userid = req.user.id;
    // here i need make like fetch all the task of the user not one so i need use find and array method in the frontend remember
    const taskdetails = await tasks.find({ userId: userid });
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
        scripts:['/js/tasks/index.js'],
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
    res.status(200).json({success:true});
}


// tasks of today upcoming and completed

exports.posttaskprogress = async(req,res)=>{
    const date = req.params.dateoftody;
    const userId = req.user.id;
    const usertaskdetails = await tasks.find({userId})
    let taskarraytoday = [];
    let taskarrayupcoming = [];
    let taskarraycompleted = [];
    usertaskdetails.forEach(task => {
        if(task.dueDate == date){
            taskarraytoday.push(task);
        }
        else if(task.dueDate >= date){
              taskarrayupcoming.push(task);
        }
        else{
            taskarraycompleted.push(task);
        }

    });
    return res.status(200).json({success:true,taskarraytoday,taskarrayupcoming,taskarraycompleted})
}