const Task = require('./task.model');

function getAllBoardTask(boardId) {
  return Task.find({
    boardId
  });
}

/**
 * @param {object<Task>} taskData
 * @returns {Promise<Task>}
 */
function createTask(taskData) {
  return Task.create(taskData);
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
function getTaskById(id) {
  return Task.findById(id);
}

/**
 * @param {object<Task>} task
 * @param {object} taskUpdateData
 * @returns {Promise<void>}
 */
function updateTask(task, taskUpdateData) {
  Task.updateOne(task, taskUpdateData);
}

/**
 * @param {object<Task>} task
 * @returns {Promise<void>}
 */
function deleteTask(task) {
  Task.findOneAndDelete(task);
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
function unassignUserTasks(user) {
  // tasks.map((item, index) => {
  //   if (item.userId === user.id) {
  //     tasks.splice(index, 1, {
  //       ...item,
  //       userId: null
  //     });
  //   }
  // });
}

module.exports = {
  getAllBoardTask,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignUserTasks
};
