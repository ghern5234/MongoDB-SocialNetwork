const router = require('express').Router();
const {getAllUsers, createUser, getUserById, updateUserById, removeUserById, addNewFriend, removeFriend } = require('../../controllers/userControllers')



router.route("/").get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUserById).delete(removeUserById)

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend)

module.exports = router;