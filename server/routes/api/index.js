const router = require('express').Router(),
    models = require('../../models'),
    PostsFilter = require('../../filters/Posts').default,
    CommentsFilter = require('../../filters/Comments').default;

router.get('/posts', async function(req, res) {
  const postsFilter = new PostsFilter(req.query, models.Post);
  const posts = await postsFilter.getPosts(models.Category);
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

router.get('/comments', async function(req, res) {
  const commentsFilter = new CommentsFilter(req.query, models.Comments);
  const comments = await commentsFilter.getPosts();
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

