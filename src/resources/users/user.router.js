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
  .post(async (req, res) => {
    const newUser = req.body;
    const { value: validatedUser, error } = userSchema.validate(newUser);
    if (!error) {
      await usersService.createUser(validatedUser);
      res
        .status(400)
        .json({ message: `User ${validatedUser.login} created successfully` });
    } else {
      res.status(201).json({ error });
    }
  });

module.exports = router;
