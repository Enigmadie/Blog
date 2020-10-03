const router = require('express').Router();
const models = require('../../models');

router.patch('/', async (req, res) => {
  const { login, oldPassword, newPassword } = req.body.data;
  await models.Profile.findAll({
    where: {
      login,
    },
  }).then(async (el) => {
    if (el.length > 0) {
      const profile = el[0].dataValues;
      const decryptedPassword = models.Profile.decryptPassword(profile.password);
      if (decryptedPassword === oldPassword) {
        const encryptedNewPassword = models.Profile.encryptPassword(newPassword);
        await models.Profile.update(
          { password: encryptedNewPassword },
          { where: { login } },
        );
        res.status(200).send({});
      } else {
        res.status(403).send('Password is not equal');
      }
    } else {
      res.status(403);
    }
  }).catch((err) => {
    console.log(err);
    res.status(403);
  });
});

module.exports = router;
