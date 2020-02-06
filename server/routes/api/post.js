var router = require('express').Router(),
    _ = require('lodash'),
    domain = require('../../index'),
    Post = require('../../models/Post').default;

router.get('/:id', function(_req, res) {
  res.render('index', { domain });
});

router.get('/:id/edit', function(_req, res) {
  res.render('index', { domain });
});

router.patch('/:id', function(_req, res) {
  var { id } = _req.params;
  var { title, preview, content, image } = _req.body;
  var updateParams = {
    title,
    preview,
    content,
    image,
    date: new Date(),
  };
  Post.updateOne({ _id: id }, updateParams, {}, function(err) {
    if (err) {
      throw(err);
    }
    res.send(_.assign(updateParams, {_id: id }));
  });
});

router.delete('/:id', function(_req, res) {
  var { id } = _req.params;
  Post.deleteOne({ _id: id }, function(err) {
    if (err) {
      throw(err);
    }
    res.send(id)
  });
});

module.exports = router;
