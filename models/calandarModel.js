const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  author: String,
  title: String,
  genre: String,
  description: String,

});

// Export the Calandar model
module.exports = mongoose.model('library', bookSchema);