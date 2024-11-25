const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'trainer' }, // Set role explicitly as 'trainer'
});

module.exports = mongoose.model('Trainer', trainerSchema);
