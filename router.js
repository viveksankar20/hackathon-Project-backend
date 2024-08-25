// router.js

const express = require('express');
const apis = require('./controller'); // Ensure this path is correct
const router = express.Router();

// Use the GET method instead of POST
router.get('/api', apis.createApi);
router.get('/geolocation',apis.collect)
module.exports = router;
