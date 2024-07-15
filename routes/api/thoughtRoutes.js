const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, updateThoughtById, deleteThoughtById, createReaction, deleteReactionById } = require('../../controllers/thoughtsControllers')


router.route('/thoughts').get(getAllThoughts).post(createThought)

router.route(':id').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')



module.exports = router;