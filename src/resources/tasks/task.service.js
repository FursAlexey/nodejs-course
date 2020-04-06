const tasks = require('./task.collection');
const taskModel = require('./task.model');

async function getAll() {
  return tasks;
}

async function createTask(taskData) {
  const newTask = new taskModel(taskData);
  tasks.push(newTask);
  return newTask;
}

module.exports = {
  getAll,
  createTask
};
