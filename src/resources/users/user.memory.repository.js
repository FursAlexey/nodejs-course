const User = require('./user.model');

/**
 * @returns {Promise<[]>}
 */
async function getAll() {
  const users = await User.find({});
  return users.map(user => User.toResponse(user));
}

/**
 * @param {object<User>} user
 * @returns {Promise<User>}
 */
async function createUser(user) {
  return User.create(user);
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getUserById(id) {
  return User.findById(id);
}

/**
 * @param {object<User>} user
 * @param {object} newData
 * @returns {Promise<void>}
 */
async function updateUser(user, newData) {
  return User.updateOne(user, newData);
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
async function deleteUser(user) {
  User.findOneAndDelete(user);
}

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
