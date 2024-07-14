const { Schema, Types } = require('mongoose');  // Because this is a schema only, we do not need model but rather Types

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => {
            return value.toDateString()
        }
    }
},
{
    toJSON: {
        getters: true
    }
});

module.exports = reactionSchema; 