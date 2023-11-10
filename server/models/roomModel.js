const mongoose = require('mongoose');

// Room Schema
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
});

module.exports = mongoose.model('Room', roomSchema);
