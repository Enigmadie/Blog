const router = require('express').Router();
const models = require('../../models');

router.post('/', async (req, res) => {
  const {
    login,
    password,
    avatar,
    avatarSmall,
  } = req.body.data;
  await models.Profile.findAll({
    where: {
      login,
    },
  }).then(async (el) => {
    if (el.length === 0) {
      const profile = await models.Profile.create({
        login,
        password,
        avatar,
        avatarSmall,
      });
      res.send(profile);
    } else {
      res.status(403);
    }
  }).catch((err) => {
    console.log(err);
    res.status(403);
  });
});

module.exports = router;
