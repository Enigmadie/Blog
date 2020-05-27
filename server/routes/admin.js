const router = require('express').Router(),
    Admin = require('../models/Admin').default;

router.post('/', function(req, res) {
  const { login, password } = req.body.data;
  const admin = new Admin({ login, password });
  const hasAccess = admin.checkAccess();
  req.session.admin = hasAccess;
  req.session.save(() => {
    res.send(hasAccess);
  });
});

module.exports = router;

