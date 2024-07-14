const router = require('express').Router();
const {getAllUsers, createUser, getUserById, updateUser, removeUserById, addNewFriend, removeFriend, getAllThoughts, createThought, getThoughtById } = require('../../controllers/userControllers')



router.route("/").get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(removeUserById)

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend)

router.route('/thoughts').get(getAllThoughts).post(createThought)

router.route('/thoughts/:thoughtText/user/:userId').get(getThoughtById)
module.exports = router;