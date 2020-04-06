const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const userSchema = require('./user.schema');

router
  .route('/')
  .get(async (req, res) => {
    const users = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    res.status(200).json(users.map(User.toResponse));
  })
  .post(
    async (req, res, next) => {
      const newUser = (req.newUser = req.body);
      const { error } = userSchema.validate(newUser);
      if (error) {
        return next(() => res.status(400).json('Bad request'));
      }
      next();
    },
    async (req, res) => {
      const { newUser } = req;
      const createdUser = await userService.createUser(newUser);
      res.status(200).json(User.toResponse(createdUser));
    }
  );

router.use((err, req, res, next) => {
  err();
});

router.param('id', async (req, res, next, id) => {
  const foundedUser = await userService.getUserById(id);
  if (foundedUser) {
    req.foundedUser = foundedUser;
    return next();
  }
  return next(() => res.status(404).json('Not found'));
});

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json(User.toResponse(req.foundedUser));
  })
  .put(async (req, res) => {
    const newDataForUser = req.body;
    const user = req.foundedUser;
    await userService.updateUser(user, newDataForUser);
    res.status(200).json('The user has been updated');
  })
  .delete(async (req, res) => {
    const user = req.foundedUser;
    await userService.deleteUser(user);
    res.status(204).json('The user deleted successfully');
  });

router.use((err, req, res, next) => {
  err();
});

module.exports = router;
