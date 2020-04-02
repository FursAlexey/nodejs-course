const users = require('./user.collection');
const userModel = require('./user.model');

async function getAll() {
  return users;
}

async function createUser(user) {
  users.push(new userModel(user));
}

async function findUser({ login }) {
  return users.find(item => {
    return item.login === login;
  });
}

module.exports = { getAll, createUser, findUser };
