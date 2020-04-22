const { hash } = require('bcrypt');

const User = require('./user.model');
const taskService = require('../tasks/task.service');

/**
 * @returns {Promise<[]>}
 */
function getAll() {
  return User.find({});
}

/**
 * @param {object<User>} user
 * @returns {Promise<User>}
 */
async function createUser(user) {
  return User.create({
    ...user,
    password: await hash(user.password, 5)
  });
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
function getUserById(id) {
  return User.findById(id);
}

/**
 * @param {object<User>} user
 * @param {object} userUpdateData
 * @returns {Promise<void>}
 */
function updateUser(user, userUpdateData) {
  return User.updateOne(user, userUpdateData);
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
async function deleteUser(user) {
  await taskService.unassignUserTasks(user);
  return User.deleteOne(user);
}

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
