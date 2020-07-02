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

    random = async () => {
        // Get the count of all polls
        const count = await Poll.count()

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all polls but only fetch one offset by our random #
        return await Poll.findOne().skip(random)
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