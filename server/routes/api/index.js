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
  if (!comments) {
    res.status(422);
    return;
  }

  res.send({
    comments,
  });
});

router.get('/profile', async (req, res) => {
  const profiles = await models.Profile.getProfiles(req.query, models);
  if (!profiles) {
    res.status(422);
    return;
  }

  if (profiles.length > 0) {
    const {
      id,
      login,
      avatar,
      avatarSmall,
    } = profiles[0];

    res.send({
      id,
      login,
      avatar,
      avatarSmall,
    });
  } else {
    res.send({
      login: 'not exist',
    }).status(422);
  }
});

module.exports = router;
