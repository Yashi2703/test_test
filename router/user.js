const express = require("express")
const UserModel = require("../controller/index")
const router = express.Router();
router.post('/users', UserModel.register)
router.post('/login', UserModel.login)
module.exports = router;