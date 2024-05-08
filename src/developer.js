// developer.js

const mongoose = require('mongoose');

// Define a schema for the developer data
const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
