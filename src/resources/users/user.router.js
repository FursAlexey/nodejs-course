const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(
    async (req, res, next) => {
      const newUser = req.body;
      req.newUser = newUser;
      const { value: validatedUser, error } = userSchema.validate(newUser);
      if (error) {
        return next(error.details.pop().message);
      }
      if (await usersService.findUser(validatedUser)) {
        return next(`User with login ${validatedUser.login} already exist`);
      }
      next();
    },
    async (req, res) => {
      const { newUser } = req;
      await usersService.createUser(newUser);
      res.status(400).json({
        message: `User ${newUser.login} created successfully`
      });
    }
  );

router.use((err, req, res, next) => {
  res.status(201).json({
    error: err
  });
  next();
});

module.exports = router;
