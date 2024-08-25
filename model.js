// model.js

const mongoose = require('./db'); // Import the mongoose instance from db.js

// Define a schema and model for testing the connection
const TestSchema = new mongoose.Schema({
    name: String,
});

const TestModel = mongoose.model('Test', TestSchema);

module.exports = TestModel;
