// In a file named contact.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: String,
  dofb: String,
  location:String,
  email: String,
  followers: String,
  following: String
});

module.exports = mongoose.model('Profile', profileSchema);