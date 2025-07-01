require('dotenv').config();
const mongoose = require('mongoose');

// Your MongoDB URI
const uri = process.env.MONGODB_URI;
// Connect to MongoDB with optionsd
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
