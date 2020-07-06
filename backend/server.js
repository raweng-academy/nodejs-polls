const routes = require("./routes/index")
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
require('dotenv').config()

// initalize mongoose
require('./config/db')

// enable cors
app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
))
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/polls', routes)

// routes
app.get('/', (req, res) => {
    res.send('Hello from Nodejs');
});

// Bootstrap server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
