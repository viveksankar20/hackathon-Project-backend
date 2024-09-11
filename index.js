// index.js

const express = require('express');
const cookieParser = require('cookie-parser');
const geoip = require('geoip-lite');
const Visitor = require('./model/visitorModel'); // Import the Visitor model

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON bodies

// Middleware to gather visitor details
app.use(async (req, res, next) => {
    req.visitorData = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        location: geoip.lookup(req.headers['x-forwarded-for'] || req.connection.remoteAddress),
        cookies: req.cookies,
        referrer: req.headers['referer'] || 'Direct',
    };
    next();
});

// Use your router
app.use('/app', require('./router/router'));

// Basic Express route
app.get('/', (req, res) => {
    res.send('Visitor tracking in place.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
