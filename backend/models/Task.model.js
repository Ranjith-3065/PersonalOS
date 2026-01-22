const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    // 🔗 Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // 📝 Core content
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    description: {
      type: String,
      trim: true
    },

    // 📊 Status tracking
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
      index: true
    },

    // ⚡ Priority
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },

    // 📅 Scheduling
    dueDate: {
      type: Date
    },

    completedAt: {
      type: Date
    },

    // 🗂 Organization
    tags: [{
      type: String,
      trim: true
    }],

    category: {
      type: String,
      enum: ['work', 'study', 'personal', 'health', 'project'],
      default: 'personal'
    },


    // ⏱ Focus / productivity
    estimatedTime: {
      type: Number // minutes
    },

    actualTime: {
      type: Number // minutes
    },

    // 🗑 Soft delete (important later)
    isArchived: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
);


//  here i need to add like how many tasks are the in certain user and count of pending completed and in progress that makes more prefect
module.exports = mongoose.model('Task', taskSchema);
