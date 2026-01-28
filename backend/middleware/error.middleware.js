const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  // ZOD validation
  if (err instanceof ZodError) {
    errors = err.issues.map(issue => ({
      field: issue.path.join("."),
      message: issue.message
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  // Mongo duplicate
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      errors: []
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      errors: []
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
      errors: []
    });
  }

  // AppError
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: []
    });
  }

  // Unknown crash
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    errors: []
  });
};
