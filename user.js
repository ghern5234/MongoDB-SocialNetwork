const {Schema, model} = require('mongoose'); // Import Schema and model from mongoose

// Define the schema for the User model
const userSchema = new Schema({
    // Define the userName field
    userName: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    // Define the email field
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Not a valid email!"]
    },
    // Define the thoughts field as an array of ObjectId references to the "thought" model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thought"
        }
    ],
    // Define the friends field as an array of ObjectId references to the "user" model
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}, {
    // Include virtuals when converting to JSON
    toJSON: {
        virtuals: true
    },
     // Disable the inclusion of the 'id' field
    id: false
})

// Create a virtual property "friendCount" that returns the number of friends
userSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

// Create the User model using the userSchema
const User = model("user", userSchema)

// Export the User model
module.exports = User