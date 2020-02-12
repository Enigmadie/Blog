var router = require('express').Router(),
    _ = require('lodash'),
    domain = require('../../'),
    Post = require('../../models/Post').default;

router.get('/:id', function(_req, res) {
  res.render('index', { domain });
});

router.get('/:id/edit', function(_req, res) {
  res.render('index', { domain });
});

router.patch('/:id', function(_req, res) {
  var { id } = _req.params;
  var { title, categories, preview, content, date } = _req.body;
  // var { image } = _
  var { admin } = _req.session;
  var updateParams = {
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
  var { id } = _req.params;
  var { admin } = _req.session;
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
