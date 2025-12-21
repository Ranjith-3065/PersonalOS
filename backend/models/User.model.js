const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
      minlength: 3,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // very important for security
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },

    name: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
