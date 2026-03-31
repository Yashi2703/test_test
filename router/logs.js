const express = require("express")
const router = express.Router();
const LogsController = require("../controller/logs")
const middleware = require("../middleware/index")
router.post('/logs', LogsController.Logs)
router.get("/", middleware, LogsController.getLogs)
module.exports = router;