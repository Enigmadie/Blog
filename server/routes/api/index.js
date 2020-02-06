var router = require('express').Router(),
    domain = require('../../');

router.use('/posts', require('./posts'));
router.use('/admin', require('./admin'));
router.use('/post', require('./post'));

router.get('/', function(_req, res) {
  res.render('index', { domain });
});

module.exports = router;

