    // server.js
    const express = require('express');
    const app = express();
    require('dotenv').config() 
    require('./config/db')
    const routes = require('./routes/index')

    const PORT = process.env.PORT || 5000;

    // configure body parser for AJAX requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    app.use("/polls", routes)
    // routes
    app.get('/', (req, res) => {
        res.send('Hello from Nodejs');
    });

    // Bootstrap server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`);
    });
