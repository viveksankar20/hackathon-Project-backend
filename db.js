const mongoose = require('mongoose');

// Your MongoDB URI
const uri = 'mongodb+srv://viveksankar2010:vivek2001@cluster0.goqyy9w.mongodb.net/sankar-vivek';
// Connect to MongoDB with options
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
