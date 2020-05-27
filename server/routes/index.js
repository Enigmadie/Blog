const router = require('express').Router();
    domain = require('../');

// router.use((req, res, next) => {
//   console.log('pool')
//   // if (req.session && req.session.nickname) {
//   //   const { nickname } = req.session;
//   //   res.locals.currentUser = users.find(user => user.nickname === nickname);
//   // } else {
//     res.locals.currentUser = 'test';
//   // }
//   console.log(req.session)
//   // req.session.admin = false;
//   next();
// });

router.use('/api', require('./api/'));
router.use('/posts', require('./posts'));
router.use('/admin', require('./admin'));
router.use('/post', require('./post'));

module.exports = router;
