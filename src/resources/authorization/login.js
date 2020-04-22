const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../common/config');
const { getUserByLogin } = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const user = await getUserByLogin(login);
  if (user) {
    const passwordIsCorrect = await compare(password, user.password);
    if (passwordIsCorrect) {
      const token = await jwt.sign(
        {
          userId: user._id,
          login
        },
        JWT_SECRET_KEY
      );
      return res.status(200).json({ token });
    }
    return res.status(401).json('Login or password incorrect');
  }
  return res.status(403).json("User doesn't exist");
});

module.exports = router;
