const router = require('express').Router(),
    models = require('../models');

router.post('/', async function(req, res) {
  const { postId, content } = req.body;
  const comment = await models.Comment.create({
    content,
    postId,
  });
  res.send(comment);
  return;
});

router.patch('/:id', async function(req, res) {
  const { id } = req.params;
  await models.Comment.update(
    req.body,
    { where: { id } })
      .catch((err) => {
        console.log(err)
        res.status(403);
  });

  res.send(id);
  return;
});

router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  await models.Comment.destroy({ where: { id } })
    .catch((err) => {
      console.log(err)
      res.status(403);
    });
  res.send(id);
  return;
});

module.exports = router;
