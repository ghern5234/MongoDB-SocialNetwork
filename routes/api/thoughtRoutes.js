const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, updateThoughtById, deleteThoughtById, createReaction, deleteReactionById } = require('../../controllers/thoughtsControllers')

// Routes to Get all Thoughts and Create new Thought
router.route('/thoughts').get(getAllThoughts).post(createThought)

// Routes to Get Thought by Id, Put new Thought by Id, and Delete Thought by Id
router.route(':id').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

// Routes to Create new Reaction
router.route('/:thoughtId/reactions').post(createReaction)

// Routes to Delete Thought Reaction by Id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById)



module.exports = router;