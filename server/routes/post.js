const router = require('express').Router(),
    _ = require('lodash'),
    Post = require('../models/Post').default;

router.patch('/:id', function(_req, res) {
  const { id } = _req.params;
  const { title, categories, preview, content, date } = _req.body;
  const image = _req.files ? `/uploads/${_req.files.image.name}` : null;
  const { admin } = _req.session;
  const updateParams = {
    title,
    categories: JSON.parse(categories),
    preview,
    content,
    image,
    date,
  };
  if (admin) {
    Post.updateOne({ _id: id }, updateParams, {}, function(err) {
      if (err) {
        throw(err);
      }
      res.send(_.assign(updateParams, {_id: id }));
    });
  } else {
    res.status(422);
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
    res.status(422);
  }
});

module.exports = router;
