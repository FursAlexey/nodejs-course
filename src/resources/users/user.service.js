const users = require('./user.collection');
const userModel = require('./user.model');
const taskService = require('../tasks/task.service');

/**
 * @returns {Promise<[]>}
 */
async function getAll() {
  return users;
}

/**
 * @param {object<User>} user
 * @returns {Promise<User>}
 */
async function createUser(user) {
  const newUser = new userModel(user);
  users.push(newUser);
  return newUser;
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getUserById(id) {
  return users.find(item => item.id === id);
}

/**
 * @param {object<User>} user
 * @param {object} newData
 * @returns {Promise<void>}
 */
async function updateUser(user, newData) {
  users.map((item, index) => {
    if (item.id === user.id) {
      users.splice(index, 1, {
        ...user,
        ...newData
      });
    }
  });
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
async function deleteUser(user) {
  await taskService.unassignUserTasks(user);
  users.map((item, index) => {
    if (item.id === user.id) {
      users.splice(index, 1);
    }
  });
}

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
