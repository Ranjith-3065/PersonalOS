const habitModel = require('../models/Habit.model');
const habitLogModel = require('../models/HabitLog.model');
const TryCatch = require('../middleware/tryCatch.middleware');
const AppError = require('../utils/apperror');
const TaskModel = require('../models/Task.model');


exports.getHabitsDashboard = TryCatch((req,res)=>{
    res.render('habits/index',{
        layout:'layouts/tasks',
        title:'habits',
        styles:['/css/habits/habits-sidebar.css','/css/habits/habits.css'],
        scripts:[],
        sidebar:'habits',
        active:'dashboard'
    })
})

exports.getCreateHabits = TryCatch((req,res)=>{
    res.render('habits/create',{
        layout:'layouts/tasks',
        title:'Createhabits',
        styles:['/css/habits/habits-sidebar.css','/css/habits/create.css'],
        scripts:['/js/habits/create.js'],
        sidebar:'habits',
        active:'create'
    })
})


exports.postCreateHabits = TryCatch(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new AppError("Login first", 401);
  }

  const {
    habitDescription,
    habitColor,
    habitFrequency,
    habitTarget,
    habitUnit
  } = req.body;

  if (!habitDescription) {
    throw new AppError("Habit name is required", 400);
  }

  const habit = await habitModel.create({
    userId,
    name: habitDescription,      
    target: habitTarget,
    unit: habitUnit,
    frequency: habitFrequency,
    color: habitColor
  });

  res.status(201).json({
    success: true,
    habit
  });
});
