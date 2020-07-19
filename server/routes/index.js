const router = require('express').Router();
    domain = require('../');

router.use('/api', require('./api/'));
router.use('/admin', require('./admin'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

module.exports = router;
