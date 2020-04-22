const { verify } = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config');

module.exports = async (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).json('Log in required');
  }
  const token = authorization.split(' ').pop();
  try {
    await verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    return res.status(401).json('Token invalid');
  }
};
