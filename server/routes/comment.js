const router = require('express').Router();
const models = require('../models');

router.post('/', async (req, res) => {
  const { postId, profileId, content } = req.body;
  await models.Comment.create({
    content,
    postId,
    profileId,
  });

  res.send({}).status(200);
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
