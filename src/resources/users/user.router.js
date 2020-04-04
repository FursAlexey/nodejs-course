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
      if (await usersService.getUserByLogin(validatedUser.login)) {
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

router.param('id', async (req, res, next, id) => {
  const foundedUser = await usersService.getUserById(id);
  if (foundedUser) {
    req.user = foundedUser;
    return next();
  }
  return next(`User with id: ${id} doesn't exist`);
});

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json(User.toResponse(req.user));
  })
  .put(async (req, res) => {
    const newDataForUser = req.body;
    const user = req.user;
    await usersService.updateUser(user, newDataForUser);
    res.status(200).json(`User with id: ${user.id} updated successfully`);
  })
  .delete(async (req, res) => {
    const { id: userId } = req.user;
    await usersService.deleteUser(req.user);
    res.status(200).json(`User with id: ${userId} deleted successfully`);
  });

router.use((err, req, res, next) => {
  res.status(201).json({
    error: err
  });
  next();
});

module.exports = router;
