// visitorModel.js

const mongoose = require('./db'); // Import the mongoose instance from db.js

// Define a schema and model for visitor data
const visitorSchema = new mongoose.Schema({
    ip: String,
    userAgent: String,
    location: String,
    visitDate: { type: Date, default: Date.now },
    referrer: String,
    cookies: Object,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
