const router = require('express').Router();
const {getAllUsers, createUser, getUserById, updateUserById, deleteUserById, addNewFriend, removeFriend } = require('../../controllers/userControllers')


// Routes to Get all Users and Create new User
router.route("/").get(getAllUsers).post(createUser);

// Routes to Get single User by Id, Put new User by Id, and Delete User by Id
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)

// Routes to Post new Friend to User and Delete Friend from User
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend)

module.exports = router;