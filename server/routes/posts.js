const router = require('express').Router(),
    Post = require('../models/Post').default,
    bucket = require('../index');

router.post('/new', async function(_req, res, next) {
  const { admin } = _req.session;
  const {
    title,
    categories,
    content,
    preview,
    date
  } = _req.body;
  if (admin) {
    if (_req.files) {
      const file = bucket.file(_req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(_req.files.image.data);
    }
    const image = _req.files ? `${_req.files.image.name}` : null;
    const post = new Post({
      title,
      categories: JSON.parse(categories),
      content,
      preview,
      image,
      date,
    });

    post.save((error) => {
      res.status(403);
    });
    res.send(post);
    return;
  } else {
    res.status(403);
  }
});

module.exports = router;
