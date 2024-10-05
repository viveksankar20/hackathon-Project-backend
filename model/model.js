// model.js

const mongoose = require('../db/db'); // Import the mongoose instance from db.js
// Define a schema and model for testing the connection
const Portfolios = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:Number,
        default:0
    },
   skills:{
    type:Array
   },
   role:[
    {
    roleName:{type:String},
    experience:{type:String},
    description:{type:String},
    company:{type:String}    
    }
   ],
   education:{

   }

 
});

const Portfolio = mongoose.model('Portfolios', Portfolios);

module.exports = Portfolio;
