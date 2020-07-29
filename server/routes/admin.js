const router = require('express').Router();

router.post('/', (req, res) => {
  const { login, password } = req.body.data;
  // const admin = new Admin({ login, password });
  // const hasAccess = admin.checkAccess();
  // req.session.admin = hasAccess;
  const hasAccess = true;
  req.session.save(() => {
    res.send(hasAccess);
  });
});

module.exports = router;
