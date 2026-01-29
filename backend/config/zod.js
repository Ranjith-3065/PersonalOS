const { z } = require("zod");

exports.signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters")
});

exports.loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 5 characters")
});
exports.resetpassSchema = z.object({
    email: z.string().email("Invalid email format"),
})
exports.resetpasswordSchema = z.object({
    password: z.string().min(5, "Password must be at least 5 characters")
})