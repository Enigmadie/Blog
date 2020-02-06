var router = require('express').Router(),
    domain = require('../../index');
    Admin = require('../../models/Admin').default;

router.get('/', function(_req, res) {
  res.render('index', { domain });
});

router.post('/', function(_req, res) {
  var { login, password } = _req.body.data;
  var admin = new Admin({ login, password });
  var hasAccess = admin.checkAccess();
  _req.session.admin = hasAccess;
  res.send(hasAccess);
});

module.exports = router;

