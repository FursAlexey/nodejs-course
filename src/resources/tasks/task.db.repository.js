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
  return Task.updateOne(task, taskUpdateData);
}

/**
 * @param {object<Task>} task
 * @returns {Promise<void>}
 */
function deleteTask(task) {
  return Task.deleteOne(task);
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
function unassignUserTasks(user) {
  return Task.updateMany(
    {
      userId: user._id
    },
    {
      userId: null
    }
  );
}

module.exports = {
  getAllBoardTask,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignUserTasks
};
