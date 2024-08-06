// Import the Express Router 
const router = require('express').Router();

// Import userRoutes and thoughtRoutes
const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./thoughtRoutes')

// Use userRoutes for the '/users' endpoint
router.use('/users', userRoutes);

// Use thoughtRoutes for the '/thoughts' endpoint
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;