const express = require('express'); // Import express
const PORT = process.env.PORT||3001 // 
const db = require('./config/connection'); // Import the database (mongodb)
const routes = require('./routes')



const app = express();  // Initialize app




app.use(express.urlencoded({extended: true})); // Lets us use (:) in our url
app.use(express.json()); // Lets us use json files in our responses and requests
app.use("/api", routes);







// This is like an event listener
// Once means run this callback function one time
// Open is the event
// So once the mongoose connection is open, run the callback function once
// App.listen starts the server
db.once("open", () => {
    app.listen(PORT, () => console.log(`Now listening on Local Host: ${PORT}`)); // This starts the server
})