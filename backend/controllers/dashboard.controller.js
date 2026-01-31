const Task = require("../models/Task.model");
const TryCatch = require("../middleware/tryCatch.middleware");
const AppHandler = require("../utils/apperror");

exports.getStats = TryCatch(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    throw new AppHandler("User not authenticated", 401);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const totalTasks = await Task.countDocuments({ userId });

  const completedToday = await Task.countDocuments({
    userId,
    status: "completed",
    completedAt: { $gte: today, $lt: tomorrow }
  });

  const todayTasks = await Task.countDocuments({
    userId,
    dueDate: { $gte: today, $lt: tomorrow }
  });

  const overdueTasks = await Task.countDocuments({
    userId,
    status: { $ne: "completed" },
    dueDate: { $lt: today }
  });

  const productivity = todayTasks
    ? Math.round((completedToday / todayTasks) * 100)
    : 0;

  res.status(200).json({
    success: true,
    data: {
      totalTasks,
      completedToday,
      overdueTasks,
      productivity
    }
  });
});
