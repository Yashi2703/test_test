const mongoose = require('mongoose');
const LogsSchema = new mongoose.Schema(
    {
        service: {
            type: String
        },
        level: {
            type: String,
            enum: ["info", "warn"]
        },
        message: {
            type: String,
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('logs', LogsSchema);