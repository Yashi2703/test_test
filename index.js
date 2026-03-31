const express = require("express")
require('dotenv').config();
const cors = require('cors');
const mongodb = require("./database/index")
const UserRouter = require("./router/user")
const LogsRouter = require("./router/logs")
const app = express();
app.use(express.json())
app.use(cors());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/api', UserRouter);
app.use("/logs", LogsRouter)
mongodb()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});