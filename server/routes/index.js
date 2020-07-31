const router = require('express').Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

router.use(async (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (err, payload) => {
      if (err) {
        next();
      } else if (payload) {
        const profiles = models.Profile.getProfiles();
        profiles.forEach((profile) => {
          if (profile.id === payload.id) {
            req.profile = profile;
            console.log(profile);
            next();
          }
        });

        if (!req.profile) next();
      }
    });
  }

  next();
});

router.use('/api', require('./api'));
router.use('/registry', require('./profile/registry'));
router.use('/auth', require('./profile/auth'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;
