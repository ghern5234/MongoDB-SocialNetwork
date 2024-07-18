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
          console.error(error)
          res.status(500).json(error)  
        }
    },
    async getUserById(req,res) {
        try {
           const user = await User.findById(req.params.id) // Search by id given in request params
            .populate("thoughts").populate("friends") 

            // Do I need an if statement to verify the user/userid exists???????


            res.status(200).json(user)      
        } catch (error) {
            res.status(500).json(error)  
        }
    },
    async updateUserById(req, res) {
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
    },
    async deleteUserById(req, res){
      try {
        const user = await User.findByIdAndDelete(req.params.id) // Is this the right method or is it findById??????????
        
        // Verify user exists in database or wrong id entered
        if(!user){
            return res.status(404).json({error: 'User not found with ID provided'})
        }
        // 
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)  
      }
    },
    async addNewFriend(req, res) {
        try {

            const user = await User.findByIdAndUpdate(req.params.userId, 
                {
                    $addToSet: {friends: req.params.friendId}
                },
                {
                    new: true
                }
            )
            
            // Verify user exists or wrong id entered
            if(!user){
                return res.status(404).json({error: 'User not found'})
            }

            res.status(200).json({user, message: 'Friend added successfully'}) // Can I do this?

        } catch (error) {
            console.error(error)
            res.status(500).json(error)  
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, 
                {$pull: {friends: req.params.friendId}},
                {
                    new: true
                }
            ) 
            
            // Verify is friend is in user friend list, if not alert user that they are not there to remove
            if(!user) {
                return res.status(404).json({error: 'Cannot find user with that ID'})
            }

            res.status(200).json({user, message: 'Friend removed successfully'}) // Can I do this?


        } catch (error) {
            console.error(error);
            res.status(500).json(error)  
        }
    }
 }