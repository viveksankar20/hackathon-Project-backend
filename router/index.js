// router.js

const express = require('express');
const apis = require('../controller/controller'); // Ensure this path is correct
const router = express.Router();

// Use the GET method instead of POST
router.get('/api', apis.getAllemployees);
router.post('/api/create-employee',apis.employee)
// router.get('/geolocation',apis.collect)




module.exports = router;
