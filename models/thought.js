const {Schema, model} = require('mongoose');
const reactionSchema = require('./schema/reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (value) => {
            return value.toDateString()
        }
    },
    userName: {
        type: String,
        required: true
      },
      reactions: [
       reactionSchema
      ]
    
},
{
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length
})

const Thought = model("thought", thoughtSchema)

module.exports = Thought;