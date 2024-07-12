const router = require('express').Router();

router.get("/", (req, res) => {
    // Get all users
    db.collection('user').find()
    


});


module.exports = router;