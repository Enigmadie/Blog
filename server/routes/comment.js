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
  const { id: profileId, isAdmin } = req.profile;
  if (isAdmin) {
    await models.Comment.destroy({ where: { id } })
      .catch((err) => {
        console.log(err);
        res.status(403);
      });
    res.send(id);
  } else if (profileId) {
    const destroyedComment = await models.Comment.destroy({ where: { id, profileId } })
      .catch((err) => {
        console.log(err);
        res.status(403);
      });
    destroyedComment > 0 ? res.send(id) : res.status(403);
  } else {
    res.status(403);
  }
});

module.exports = router;
