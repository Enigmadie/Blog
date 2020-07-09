const router = require('express').Router(),
    models = require('../../models'),
    PostsFilter = require('../../filters/Posts').default;

router.get('/posts', async function(_req, res) {
  const postsFilter = new PostsFilter(_req.query, models.Post);
  const posts = await postsFilter.getPosts();
  const postsCount = await postsFilter.getCount();
  if (!posts) {
    res.status(422);
    return;
  }
  res.send({
    posts,
    postsCount,
  });
});

router.get('/admin', function(_req, res) {
  const isAdmin = _req.session.admin ? _req.session.admin : false;
  res.send({ isAdmin });
});

module.exports = router;

