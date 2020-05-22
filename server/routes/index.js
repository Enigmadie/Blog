const router = require('express').Router();
    domain = require('../');

router.use('/api', require('./api/'));
router.use('/posts', require('./posts'));
router.use('/admin', require('./admin'));
router.use('/post', require('./post'));

module.exports = router;
