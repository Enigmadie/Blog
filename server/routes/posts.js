const router = require('express').Router(),
    models = require('../models'),
    bucket = require('../index');

router.post('/new', async function(req, res, next) {
  const { admin } = req.session;
  const {
    title,
    content,
    categories,
    preview,
    created_at
  } = req.body;
  if (true) {
    if (req.files) {
      const file = bucket.file(req.files.image.name)
      const stream = file.createWriteStream();

      stream.on('error', (err) => {
        next(err);
      });

      stream.end(req.files.image.data);
    }
    const image = req.files ? `${req.files.image.name}` : null;
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
