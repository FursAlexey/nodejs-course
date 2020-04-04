const users = require('./user.collection');
const userModel = require('./user.model');

/**
 * @returns {Promise<[]>}
 */
async function getAll() {
  return users;
}

/**
 * @param {object} user
 * @returns {Promise<User>}
 */
async function createUser(user) {
  const newUser = new userModel(user);
  users.push(newUser);
  return newUser;
}

/**
 * @param {string} login
 * @returns {Promise<Promise<*>|*>}
 */
async function getUserByLogin(login) {
  return users.find(item => {
    return item.login === login;
  });
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getUserById(id) {
  return users.find(item => item.id === id);
}

/**
 * @param {object} user
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
 * @param {object} user
 * @returns {Promise<void>}
 */
async function deleteUser(user) {
  users.map((item, index) => {
    if (item.id === user.id) {
      users.splice(index, 1);
    }
  });
}

module.exports = {
  getAll,
  createUser,
  getUserByLogin,
  getUserById,
  deleteUser,
  updateUser
};
