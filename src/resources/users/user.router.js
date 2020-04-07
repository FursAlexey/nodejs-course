const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const userSchema = require('./user.schema');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
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
      const createdUser = await usersService.createUser(newUser);
      res.status(200).json(User.toResponse(createdUser));
    }
  );

router.param('id', async (req, res, next, id) => {
  const foundedUser = await usersService.getUserById(id);
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
    const newUserData = req.body;
    const user = req.foundedUser;
    await usersService.updateUser(user, newUserData);
    res.status(200).json('The user has been updated');
  })
  .delete(async (req, res) => {
    const user = req.foundedUser;
    await usersService.deleteUser(user);
    res.status(204).json('The user deleted successfully');
  });

router.use((err, req, res, next) => {
  err();
  next();
});

module.exports = router;
