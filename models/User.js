const mongoose = require('mongoose');
const Thought = require('./Thought');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Email address is invalid']
  },
  thoughts: [String],
  friends: [String]
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

userSchema.virtual("friendCount").get(function()  {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;