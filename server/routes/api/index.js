const router = require('express').Router(),
    models = require('../../models');

router.get('/posts', async function(req, res) {
  const posts = await models.Post.getPosts(req.query, models);
  const postsCount = await models.Post.getCount(models);
  if (!posts) {
    res.status(422);
    return;
  }
  res.send({
    posts,
    postsCount,
  }).status(200);
});

router.get('/comments', async function(req, res) {
  const comments = await models.Comment.getComments(req.query, models);
  if (!comments) {
    res.status(422);
    return;
  }
  res.send({
    comments,
  });
});

router.get('/admin', function(req, res) {
  const isAdmin = req.session.admin ? req.session.admin : false;
  res.send({ isAdmin: true });
});

module.exports = router;

