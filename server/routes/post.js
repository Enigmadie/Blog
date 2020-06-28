const router = require('express').Router(),
    _ = require('lodash'),
    bucket = require('../index'),
    Post = require('../models/Post').default;

router.patch('/:id', function(_req, res) {
  const { id } = _req.params;
  const { title, categories, preview, image, content, date } = _req.body;
  const editedImage = _req.files ? _req.files.image.name : image;
  const { admin } = _req.session;
  const updateParams = {
    title,
    categories: JSON.parse(categories),
    preview,
    content,
    image: editedImage,
    date,
  };
  if (admin) {
    if (_req.files) {
      const file = bucket.file(_req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(_req.files.image.data);
    }
    Post.updateOne({ _id: id }, updateParams, {}, function(err) {
      if (err) {
        throw(err);
      }
      res.send(_.assign(updateParams, {_id: id }));
    });
  } else {
    res.status(403);
  }
});

router.delete('/:id', function(_req, res) {
  const { id } = _req.params;
  const { admin } = _req.session;
  if (admin) {
    Post.deleteOne({ _id: id }, function(err) {
      if (err) {
        throw(err);
      }
      res.send(id);
    });
  } else {
    res.status(403);
  }
});

module.exports = router;
