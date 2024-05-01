// models/User.js
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);