const router = require('express').Router(),
    models = require('../models'),
    bucket = require('../index');

router.post('/new', async function(_req, res, next) {
  const { admin } = _req.session;
  const {
    title,
    content,
    categories,
    preview,
    created_at
  } = _req.body;
  if (true) {
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
      created_at,
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

module.exports = router;
