const router = require('express').Router(),
    bucket = require('../index'),
    models = require('../models');

router.patch('/:id', function(req, res) {
  const { id } = req.params;
  const { title, categories, preview, image, content, created_at } = req.body;
  const editedImage = req.files ? req.files.image.name : image;
  const { admin } = req.session;
  const paramsUpdating = {
    title,
    categories: JSON.parse(categories),
    preview,
    content,
    image: editedImage,
    created_at,
  };
  if (true) {
    if (req.files) {
      const file = bucket.file(req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(req.files.image.data);
    }
    models.Post.update(
      paramsUpdating,
      { where: { id } })
        .catch((err) => {
          console.log(err)
          res.status(403);
    });
  } else {
    res.status(403);
  }
});

router.delete('/:id', function(req, res) {
  const { id } = req.params;
  const { admin } = req.session;
  if (true) {
    models.Post.destroy({ where: { id } })
      .catch((err) => {
        console.log(err)
        res.status(403);
      });
    res.send(id);
  } else {
    res.status(403);
  }
});

module.exports = router;
