// Poll.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Number } = require('mongoose');
mongoose.set('useFindAndModify', false);

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
	choices: [choiceSchema]
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = {
    Poll, 
    Choice
};