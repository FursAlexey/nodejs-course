const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { tryCatch } = require('../service');

router
  .route('/')
  .get(
    tryCatch(async (req, res) => {
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    tryCatch(async (req, res) => {
      const newUser = req.body;
      const createdUser = await usersService.createUser(newUser);
      res.status(200).json(User.toResponse(createdUser));
    })
  );

router.param(
  'id',
  tryCatch(async (req, res, next, id) => {
    const foundedUser = await usersService.getUserById(id);
    req.foundedUser = foundedUser;
    next();
  })
);

router
  .route('/:id')
  .get(
    tryCatch((req, res) => {
      res.status(200).json(User.toResponse(req.foundedUser));
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const newUserData = req.body;
      const user = req.foundedUser;
      await usersService.updateUser(user, newUserData);
      res.status(200).json('The user has been updated');
    })
  )
  .delete(
    tryCatch(async (req, res) => {
      const user = req.foundedUser;
      await usersService.deleteUser(user);
      res.status(204).json('The user deleted successfully');
    })
  );

module.exports = router;
