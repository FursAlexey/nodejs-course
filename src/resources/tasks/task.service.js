const tasksRepo = require('./task.memory.repository');

const getAllBoardTask = boardId => tasksRepo.getAllBoardTask(boardId);
const createTask = taskData => tasksRepo.createTask(taskData);
const getTaskById = id => tasksRepo.getTaskById(id);
const updateTask = (task, taskUpdateData) =>
  tasksRepo.updateTask(task, taskUpdateData);
const deleteTask = task => tasksRepo.deleteTask(task);
const unassignUserTasks = user => tasksRepo.unassignUserTasks(user);

module.exports = {
  getAllBoardTask,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  unassignUserTasks
};
