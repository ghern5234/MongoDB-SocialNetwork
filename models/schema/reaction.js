const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: String,
        required:true,
    }
})

module.exports = reactionSchema; 