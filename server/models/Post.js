const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 60,
  },
  categories: Array,
  content: {
    type: String,
    minlength: 1,
  },
  preview: {
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  image: Object,
  date: Date,
}, {
  collection: 'posts_data',
});

exports.default = mongoose.model('Post', postSchema);

