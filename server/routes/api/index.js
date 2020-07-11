const router = require('express').Router(),
    models = require('../../models'),
    PostsFilter = require('../../filters/Posts').default;

router.get('/posts', async function(req, res) {
  const postsFilter = new PostsFilter(req.query, models.Post);
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

router.get('/admin', function(req, res) {
  const isAdmin = req.session.admin ? req.session.admin : false;
  res.send({ isAdmin: true });
});

module.exports = router;

