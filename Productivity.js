const mongoose = require('mongoose');

const productivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  focusedMinutes: { type: Number, default: 0 },
  distractionsBlocked: { type: Number, default: 0 }
});

module.exports = mongoose.model('Productivity', productivitySchema);