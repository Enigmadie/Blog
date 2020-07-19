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

module.exports = router;
