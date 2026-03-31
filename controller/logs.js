const LogsModel = require("../model/logs")

const Logs = async (req, res) => {
    const { service, level, message } = req.body

    try {
        const newLogs = new LogsModel({
            service,
            level,
            message
        });
        const savedLogs = await newLogs.save();
        return res.status(201).json({
            status: "success",
            data: {
                user: savedLogs._id,
            },
            message: "Logs successful. Please log in.",
        });
    } catch (err) {
        console.log(err)
    }
}
const getLogs = async (req, res) => {
    try {
        const newLogs = await LogsModel.find()
        const filters = req.query;
        const filteredUsers = newLogs.filter(user => {
            let isValid = true;
            for (key in filters) {
                console.log(key, user[key], filters[key]);
                isValid = isValid && user[key] == filters[key];
            }
            return isValid;
        });
        return res.status(201).json({
            status: "success",
            data: {
                user: filteredUsers,
            },
            message: "Logs successful. Please log in.",
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    Logs,
    getLogs
}