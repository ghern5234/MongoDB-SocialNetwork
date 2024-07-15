const { Thought} = require('../models')


module.exports = {
    async getAllThoughts(req, res) {
        try {
            // Find all thoughts
            const thought = Thought.find()
            // Display thought and status
            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.setatus(500).json(error)
        }
    },
    // Verify this is correct?????????
    async createThought(req, res) {
        try {
            // Create a Thought from request body
            const newThought = new Thought(req.body)
            await newThought.save();
            
            // Search for user by id and verify if they already exist or not
            const user = await User.findById(req.body.userId);
            if(!user) {
                return res.status(404).json({error: 'User not found with ID provided'})
            }
            // Update user thought array to contain new id
            user.thoughts.push(newThought._id); //Do I need the _id??????
            await user.save();
            // Success message
            res.status(201).json({ message: 'Thought created and added to user successfully', thought: newThought });
        } catch (error) {
            console.error(error)
            res.setatus(500).json(error)
        }
    },
    async getThoughtById (req, res) {
        try {
            // Locate thought using id provided
            // Do I search for the thought id or the user id???
            const thought = await Thought.findById(req.params.id)

            res.status(200).json(thought)
        } catch (error) {
            console.error(error)
            res.setatus(500).json(error)
        }

    },
    async updateThoughtById(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, { // Is this id or _id?
                $set: req.body // Double check this ??????????
            }, {
                runValidators: true,
                new: true
            })
           
            res.status(200).json(updatedThought)
        } catch (error) {
            console.error(error)
            res.setatus(500).json(error)
        }
},
    async deleteThoughtById(req, res) {
        try {
            
        } catch (error) {
            console.error(error)
            res.setatus(500).json(error)
        }
    },
    async createReaction(req, res) {
        
        try {
            const thought = await Thought.findById(req.params.thoughtId) // Verify if this is right??????????
            
        
            // Need to verify if the friend exists in the users friends list
            // if(thought.reaction.includes(req.params.reactions)){
            //     return res.status(400).json({error: 'Friend already added'})
            // }

            // Add the reaction to the user's thought list
            thought.reactions.push(req.params.reactions); // Verify if this is right???????
            await thought.save(); //await here or above?????

            res.status(200).json(thought, {message: 'Reactin added successfully'}) // Can I do this?

        } catch (error) {
            res.status(500).json(error)  
        }
    },
    async deleteReactionById (req, res) {
        try {

            const thought = await Thought.findOneAndDelete(req.params.reacationId) //Is this right? or is it just find by id?

            // Verify thought exists ??????
            if(!thought) {
                return res.status(404).json({error: 'Friend already not in friend list'})
            }
            
            // Verify reaction is in thought's reaction array
            const reactionIndex = thought.reactions.indexOf(req.params.reactionId)
            if(reactionIndex === -1){
                return res.status(400).json({error: 'Reactionn not found'})
            }
            // Delete reactions(Id?) from thoughts reaction array at reaction index and update thought
            thought.reactions.splice(reactionIndex, 1);
            await thought.save();

            res.status(200).json(thought, {message: 'Reaction successfuly removed'})

            
        } catch (error) {

            console.error(error);
            res.status(500).json(error);
        }
    },

}