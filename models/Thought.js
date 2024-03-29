const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.ObjectId,
        default: ()=>new mongoose.Types.ObjectId()
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactionBody: {
        type: String,
        maxLength: 280,
        required: true
    }
});


const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions:[reactionSchema]
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

thoughtSchema.virtual("reactionCount").get(function()  {
  return this.reactions.length;
});
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;