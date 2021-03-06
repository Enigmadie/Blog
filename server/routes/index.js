const router = require('express').Router();
const jwt = require('jsonwebtoken');
const tokenKey = require('../token-key');
const models = require('../models');

router.use((req, res, next) => {
  const isAuth = req.headers.authorization;
  req.profile = { isAdmin: false };
  if (isAuth && isAuth.length > 0) {
    jwt.verify(req.headers.authorization, tokenKey, async (err, payload) => {
      if (err) {
        next();
      } else if (payload) {
        const profiles = await models.Profile.getProfiles({ id: payload.id }, models);
        if (profiles.length > 0) {
          req.profile = profiles[0].dataValues;
        }
        next();
      }
    });
  } else {
    next();
  }
});

router.use('/api', require('./api'));
router.use('/registry', require('./profile/registry'));
router.use('/auth', require('./profile/auth'));
router.use('/changepassword', require('./profile/changepassword'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;
