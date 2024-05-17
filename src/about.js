// In a file named contact.js
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: String,
  year: String,
  location: String,
  email: String
});

module.exports = mongoose.model('About', aboutSchema);