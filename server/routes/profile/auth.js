const router = require('express').Router();
const jwt = require('jsonwebtoken');
const tokenKey = require('../../token-key');
const models = require('../../models');

router.post('/', async (req, res) => {
  const { login, password } = req.body.data;
  await models.Profile.findAll({
    where: {
      login,
    },
  }).then(async (el) => {
    if (el.length > 0) {
      const profile = el[0].dataValues;
      const decryptedPassword = models.Profile.decryptPassword(profile.password);
      if (decryptedPassword === password) {
        const token = jwt.sign({
          id: profile.id,
          login: profile.login,
          isAdmin: profile.isAdmin,
          avatar: profile.avatar,
          avatarSmall: profile.avatarSmall,
        }, tokenKey);
        res.send({ ...profile, token });
      } else {
        res.status(403);
      }
    } else {
      res.status(403);
    }
  }).catch((err) => {
    console.log(err);
    res.status(403);
  });
});

module.exports = router;
