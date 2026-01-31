const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const dashboard = require("../controllers/dashboard.controller");

router.get("/stats", auth.authtoken, dashboard.getStats);

module.exports = router;