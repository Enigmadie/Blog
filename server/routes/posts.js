const router = require('express').Router(),
    models = require('../models'),
    bucket = require('../index');

router.post('/new', async function(_req, res, next) {
  const { admin } = _req.session;
  const {
    title,
    content,
    preview,
    createdAt
  } = _req.body;
  if (true === true) {
    if (_req.files) {
      const file = bucket.file(_req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(_req.files.image.data);
    }
    const image = _req.files ? `${_req.files.image.name}` : null;

    const post = await models.Post.create({
      title,
      content,
      preview,
      image,
      createdAt,
    }).error(function(e) {
      console.log(e)
      res.status(403);
    });
    res.send(post);
    return;
  } else {
    res.status(403);
  }
});

module.exports = router;
