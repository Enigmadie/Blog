const router = require('express').Router(),
    Admin = require('../models/Admin').default;

router.post('/', function(_req, res) {
  const { login, password } = _req.body.data;
  const admin = new Admin({ login, password });
  const hasAccess = admin.checkAccess();
  _req.session.admin = hasAccess;
  res.send(hasAccess);
});

module.exports = router;

