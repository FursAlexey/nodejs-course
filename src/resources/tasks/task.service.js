const tasksRepo = require('./task.db.repository');

const getAllBoardTasksById = boardId => tasksRepo.getAllBoardTasksById(boardId);
const createTask = taskData => tasksRepo.createTask(taskData);
const getTaskById = id => tasksRepo.getTaskById(id);
const updateTask = (task, taskUpdateData) =>
  tasksRepo.updateTask(task, taskUpdateData);
const deleteTask = task => tasksRepo.deleteTask(task);
const unassignUserTasks = user => tasksRepo.unassignUserTasks(user);

module.exports = {
  getAllBoardTasksById,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignUserTasks
};
