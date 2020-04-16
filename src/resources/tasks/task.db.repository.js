const taskModel = require('./task.model');
const tasks = [];

async function getAllBoardTask(boardId) {
  return tasks.filter(item => item.boardId === boardId);
}

/**
 * @param {object<Task>} taskData
 * @returns {Promise<Task>}
 */
async function createTask(taskData) {
  const newTask = new taskModel(taskData);
  tasks.push(newTask);
  return newTask;
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getTaskById(id) {
  return tasks.find(item => item.id === id);
}

/**
 * @param {object<Task>} task
 * @param {object} taskUpdateData
 * @returns {Promise<void>}
 */
async function updateTask(task, taskUpdateData) {
  tasks.map((item, index) => {
    if (item.id === task.id) {
      tasks.splice(index, 1, {
        ...task,
        ...taskUpdateData
      });
    }
  });
}

/**
 * @param {object<Task>} task
 * @returns {Promise<void>}
 */
async function deleteTask(task) {
  tasks.map((item, index) => {
    if (item.id === task.id) {
      tasks.splice(index, 1);
    }
  });
}

/**
 * @param {object<User>} user
 * @returns {Promise<void>}
 */
async function unassignUserTasks(user) {
  tasks.map((item, index) => {
    if (item.userId === user.id) {
      tasks.splice(index, 1, {
        ...item,
        userId: null
      });
    }
  });
}

module.exports = {
  getAllBoardTask,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignUserTasks
};
