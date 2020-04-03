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
 * @returns {Promise<void>}
 */
async function createUser(user) {
  users.push(new userModel(user));
}

/**
 * @param {string} login
 * @returns {Promise<Promise<*>|*>}
 */
async function findUserByLogin(login) {
  return users.find(item => {
    return item.login === login;
  });
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function findUserById(id) {
  return users.find(item => item.id === id);
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
  findUserByLogin,
  findUserById,
  deleteUser
};
