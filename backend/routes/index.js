const express = require('express')
var app = express()
const PollController = require("../controllers/pollController")
const pollController = new PollController()

app.post('/', pollController.create);

app.get('/random', pollController.random);

app.get('/:id', pollController.show);

app.get('/', pollController.list);

app.post('/:id/vote', pollController.vote);



module.exports = app;