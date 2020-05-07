const router = require('express').Router(),
    Post = require('../../models/Post').default,
    PostsFilter = require('../../filters/Posts').default;

router.get('/posts', async function(_req, res) {
  const postsFilter = new PostsFilter(_req.query, Post);
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

