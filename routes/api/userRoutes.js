const router = require('express').Router();
const {getAllUsers, createUser, getUserById, updateUser } = require('../../controllers/userControllers')



router.route("/").get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser)

router.route('/:userId/friends/:friendId')

module.exports = router;