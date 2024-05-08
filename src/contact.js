// In a file named contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('Contact', contactSchema);
