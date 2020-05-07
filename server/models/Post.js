const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  categories: Array,
  content: String,
  preview: String,
  image: Object,
  date: Date,
}, {
  collection: 'posts_data',
});

exports.default = mongoose.model('Post', postSchema);

