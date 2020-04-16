const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const createUser = user => usersRepo.createUser(user);
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (user, updateUserData) =>
  usersRepo.updateUser(user, updateUserData);
const deleteUser = user => usersRepo.deleteUser(user);

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
