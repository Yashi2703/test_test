const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Use 127.0.0.1 for better compatibility with Node.js 18+
        const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1/mydb';

        // Connect with the URI; Mongoose handles connection pooling automatically
        await mongoose.connect(mongoUri);

        console.log('MongoDB Connected successfully!');

        // Optional: Add listeners for subsequent connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
