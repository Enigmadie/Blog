const router = require('express').Router(),
    bucket = require('../app'),
    models = require('../models');

router.post('/', async function(req, res) {
  const { admin } = req.session;
  const {
    title,
    content,
    categories,
    preview,
  } = req.body;
  if (true) {
    if (req.files) {
      const file = bucket.file(req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        console.log(err);
      });

      stream.end(req.files.image.data);
    }
    const image = req.files ? `${req.files.image.name}` : null;
    const post = await models.Post.create({
      title,
      content,
      preview,
      image,
    });

    const categoriesArr = JSON.parse(categories);

    categoriesArr.forEach(async (category) => {
      const categoryItem = await models.Category.findAll({
        where: { category }
      });

      await models.PostCategories.create({
        createdAt: new Date(),
        category_id: categoryItem[0].dataValues.id,
        post_id: post.dataValues.id,
      });
    });

    res.send(post);
    return;
  } else {
    res.status(403);
  }
});

router.patch('/:id', async function(req, res) {
  const { id } = req.params;
  const { title, categories, preview, image, content } = req.body;
  const editedImage = req.files ? req.files.image.name : image;
  const { admin } = req.session;
  const paramsUpdating = {
    title,
    categories: JSON.parse(categories),
    preview,
    content,
    image: editedImage,
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
    await models.Post.update(
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

router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  const { admin } = req.session;
  if (true) {
    await models.Post.destroy({ where: { id } })
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
