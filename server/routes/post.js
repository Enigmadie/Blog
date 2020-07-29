const router = require('express').Router();
const _ = require('lodash');
const bucket = require('../app');
const models = require('../models');

router.post('/', async (req, res) => {
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
        where: { category },
      });

      await models.PostCategories
        .create({
          createdAt: new Date(),
          category_id: categoryItem[0].dataValues.id,
          post_id: post.dataValues.id,
        })
        .catch(() => res.status(403));
    });

    const posts = _.merge(post.dataValues, { categories: categoriesArr });
    res.send(posts);
  } else {
    res.status(403);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    categories,
    preview,
    image,
    content,
  } = req.body;
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
      const file = bucket.file(req.files.image.name);
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(req.files.image.data);
    }
    await models.Post.update(
      paramsUpdating,
      { where: { id } },
    )
      .then(() => res.send(paramsUpdating))
      .catch((err) => {
        console.log(err);
        res.status(403);
      });
  } else {
    res.status(403);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { admin } = req.session;
  if (true) {
    await models.Post.destroy({ where: { id } })
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log(err);
        res.status(403);
      });
    // res.send({ id });
  } else {
    res.status(403);
  }
});

module.exports = router;
