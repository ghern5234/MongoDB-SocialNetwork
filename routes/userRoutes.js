const router = require('express').Router();

router.get("/", (req, res) => {
    console.log('Hello')
});


module.exports = router;