// index.js

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON bodies

// Use your router
app.use('/app', require('./router'));

// Basic Express route
app.get('/', (req, res) => {
    res.send({message:'server started'});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
