const { User, Thought } = require('../models');



module.exports = { 
    async getAllUsers(req, res) {
        try {
            const users = await User.find() // Go find all Users
            res.status(200).json(users)

        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body) // Create user from the request from the body
            res.status(200).json(user)


        } catch (error) {
          res.status(500).json(error)  
        }
    },
    async getUserById(req,res) {
        try {
           const user = await User.findById(req.params.id) // Search by id given in request params
            .populate("thoughts").populate("friends") 
            res.status(200).json(user)      
        } catch (error) {
            res.status(500).json(error)  
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                runValidators: true,
                new: true 
            })
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)  
        }
    }
 }