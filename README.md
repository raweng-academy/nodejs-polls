# mern-polls backend
### Prerequisite for the project
-  Nodejs with Npm installed.
   Can be found at https://nodejs.org/en/download/
- Visual studio code. with command line `code` enabled.
- Create Account with mongodb atlas and create a cluster
- Github account setup with ssh keys added in account.

**npm** is a node package manager for nodejs.
Allows you to download and install node libraries in project.


###  1. Create project dir.
    <!-- Make directory -->
    mkdir nodejs-polls

    <!-- change directory -->
    cd nodejs-polls

### Setup git
    git init

    npx create-react-app web

    mkdir backend
    cd backend

### setup app server framework.
    <!-- make project nodejs ready -->
    npm init -y
    
    <!-- install web server and ODM -->
    npm install -S express mongoose

    <!-- Open the project in Vs code IDE  -->
    code .


###  create file server.js with below code
        // server.js
        const express = require('express');
        const app = express();

        const PORT = process.env.PORT || 5000;

        // configure body parser for AJAX requests
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // routes
        app.get('/', (req, res) => {
            res.send('Hello from Nodejs');
        });

        // Bootstrap server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
        });
    ```

###  run the project 
    npm start
    open localhost:5000 in browser
    <!-- You should see Hello from Nodejs -->

###  install nodemon  
    npm install -g nodemon

###  verify if the prject is running propertly
    Go to localhost:3000

### add env support
    <!-- install .env support -->
    npm install dotenv

    <!-- add below to server.js imports -->
    require('dotenv').config() 

    touch .env       

### initalize mongoose ODM
Add mongodb URI to .env

    // .env
    MONGO_DB=mongodb://localhost:27017    

    <!-- create configs directory -->
    mkdir config

    <!-- Create file config/db.js -->
    touch config/db.js

    // db.js 
    const mongoose = require('mongoose');
    const connection = mongoose.connection;
    const uri = process.env.MONGO_DB;

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

    connection.once('open', () => {
    console.log(
        "MongoDB database connection established successfully");
    })
    module.exports = mongoose;

### create projects dir
    mkdir models 
    mkdir services
    mkdir controllers
    mkdir routes

###  add database models    
    // create models/poll.js
    
    <!-- paste the below code -->
    // poll.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const { Number } = require('mongoose');

    const choiceSchema = new Schema({
        text: {
            type: String,
            required: true
        },
        votes: {
            type: Number,
            required: true,
            default: 0
        }
    });
    const Choice = mongoose.model('Choice', choiceSchema);

    const pollSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        choices: [{
            type: Schema.Types.ObjectId,
            ref: 'Choice'		
        }]
    });

    const Poll = mongoose.model('Poll', pollSchema);
    module.exports = {
        Poll, 
        Choice
    };

###  add routes
    // routes/index.js

    const express = require('express')
    var app = express()
    const PollController = require("../controllers/pollController")
    const pollController = new PollController()

    app.post('/', pollController.create);

    app.get('/:id', pollController.show);

    app.get('/', pollController.list);

    app.post('/:id/vote', pollController.vote);

    module.exports = app;

###  add controllers
    // controllers/pollController.js

    const PollService = require("../services/pollService")

    class PollController {
        pollService;
        
        constructor() {
            this.pollService = new PollService();
        }
        
        create = async (req, res) => {
            const response =  await this.pollService.create(req.body)
            res.status(201).json(response)
        }

        vote = async (req, res) => {
            const response =  await this.pollService.create(req.body)
            res.status(201).json(response)
        }
        
        show = async(req, res) => {
            const response = await this.pollService.get(req.params.id)
            res.status(200).json(response)
        }

        list = async (req, res) => {
            const response =  await this.pollService.all()
            res.status(200).json(response)
        }

        vote = async(req, res) => {
            const response = await this.pollService.vote(req.params.id, req.body)
            res.status(200).json(response)
        }
    }

    module.exports = PollController;

###  add services
    services/pollServices.js
    const {Poll, Choice} = require("../models/poll")

    class PollService {
        create = async (poll) => {
            const newPoll = new Poll(poll)
            await newPoll.save()
            return newPoll;
        }

        all = async () => {
            const results = await Poll.find()
            return results;
        }

        get = async (id) => {
            return await Poll.findById(id)
        }

        vote = async (id, pollBody) => {
            // find poll from database 
            const poll = await this.get(id)

            // find voted choice
            const votedChoice = pollBody.choices.find((choice) => choice.voted)        

            // update vote count
            const choice =  poll.choices.find((c) => c._id == votedChoice._id);
            choice.votes = choice.votes + 1

            // save vote count
            await poll.save();

            // return update poll
            return poll;
        }
    }

    module.exports = PollService;

###  Enable cors   
    <!-- install cors library -->
    npm install -save cors

    <!-- Add this to server.js -->
    const cors = require('cors');
    // enable cors
    app.use(cors(
        {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
    ))

### deploy to heroku
    <!-- Deploy backend -->
    cd backend
    git init
    git add . -A 
    git commit -m "Push to heroku"
    heroku config:set MONGODB="URL"
    git push heroku master
    
    <!-- Deploy web -->
    cd web
    git init
    git add . -A 
    git commit -m "Push to heroku"
    heroku create <ANYAppNAME> --buildpack mars/create-react-app
    heroku config:set REACT_APP_BACKEND=""    
    git push heroku master