var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  preview: String,
  image: Object,
  date: Date,
}, {
  collection: 'posts_data',
});

exports.default = mongoose.model('Post', postSchema);

