const mongoose = require('mongoose');
const configs = require('./configs');

async function connectDb() {
    try {
        await mongoose.connect(configs.DB_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectDb;