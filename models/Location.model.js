const mongoose = require('mongoose');

// Location Schema and Model
const locationSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Location', locationSchema);