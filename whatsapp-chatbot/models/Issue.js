const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  phone:       { type: String, required: true },
  department:  { type: String, required: true },
  description: { type: String, required: true },
  imageUrl:    { type: String, default: null },
  timestamp:   { type: Date,   default: Date.now },
});

module.exports = mongoose.model('Issue', issueSchema);
