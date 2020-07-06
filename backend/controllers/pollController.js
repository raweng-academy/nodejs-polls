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

    random = async(req, res) => {
        const response = await this.pollService.random()
        res.status(200).json(response)
    }

    vote = async(req, res) => {
        const response = await this.pollService.vote(req.params.id, req.body)
        res.status(200).json(response)
    }
}

module.exports = PollController;