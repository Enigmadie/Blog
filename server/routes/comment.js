const router = require('express').Router();
const models = require('../models');

router.post('/', async (req, res) => {
  const { postId, content } = req.body;
  const comment = await models.Comment.create({
    content,
    postId,
  });
  res.send(comment);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  await models.Comment.update(
    req.body,
    { where: { id } },
  )
    .catch((err) => {
      console.log(err);
      res.status(403);
    });

  res.send(id);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await models.Comment.destroy({ where: { id } })
    .catch((err) => {
      console.log(err);
      res.status(403);
    });
  res.send(id);
});

module.exports = router;
