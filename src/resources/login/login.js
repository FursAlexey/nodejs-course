const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLoginPassword } = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const user = await getUserByLoginPassword(login, password);
  if (user) {
    const token = await jwt.sign(
      {
        userId: user._id,
        login
      },
      JWT_SECRET_KEY
    );
    return res.status(200).json({ token });
  }
  return res.status(401).json('Bad login or password');
});

module.exports = router;
