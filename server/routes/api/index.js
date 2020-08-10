const router = require('express').Router();
const models = require('../../models');

router.get('/posts', async (req, res) => {
  const posts = await models.Post.getPosts(req.query, models);
  const postsCount = await models.Post.getCount(models);
  if (!posts) {
    res.status(422);
    return;
  }
  res.status(200).send({
    posts,
    postsCount,
  });
});

router.get('/comments', async (req, res) => {
  const comments = await models.Comment.getComments(req.query, models);
  console.log(comments);
  if (!comments) {
    res.status(422);
    return;
  }

  res.send({
    comments,
  });
});

module.exports = router;
