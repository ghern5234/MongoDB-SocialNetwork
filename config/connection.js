// Import the connect and connection methods from mongoose
const { connect, connection } = require('mongoose');


// Connect to the MongoDB database at the specified URL
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// Export the database connection
module.exports = connection;
