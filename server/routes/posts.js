const router = require('express').Router(),
    Post = require('../models/Post').default;

router.post('/new', function(_req, res) {
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
      const imgPath = `../uploads/${_req.files.image.name}`
      _req.files.image.mv(imgPath);
    }
    const image = _req.files ? `/uploads/${_req.files.image.name}` : null;
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
