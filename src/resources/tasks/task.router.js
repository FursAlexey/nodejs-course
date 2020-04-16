const router = require('express').Router();
const tasksService = require('./task.service');
const taskSchema = require('./task.schema');
const { tryCatch } = require('../service');

router
  .route('/')
  .get(
    tryCatch(async (req, res) => {
      const { boardId } = req;
      const boardTasks = await tasksService.getAllBoardTask(boardId);
      res.status(200).json(boardTasks);
    })
  )
  .post(async (req, res, next) => {
    const newTaskData = {
      ...req.body,
      boardId: req.boardId
    };
    const { error } = taskSchema.validate(newTaskData);
    if (error) {
      return next(() => res.status(401).json('Bad request'));
    }
    const createdTask = await tasksService.createTask(newTaskData);
    res.status(200).json(createdTask);
  });

router.param('id', async (req, res, next, id) => {
  const foundedTask = await tasksService.getTaskById(id);
  if (foundedTask) {
    req.task = foundedTask;
    return next();
  }
  next(() => res.status(404).json('Not found'));
});

router
  .route('/:id')
  .get(async (req, res) => {
    const { task } = req;
    res.status(200).json(task);
  })
  .put(async (req, res, next) => {
    const taskUpdateData = req.body;
    const taskForUpdate = req.task;
    const { error } = taskSchema.validate(taskUpdateData);
    if (error) {
      return next(() => res.status(400).json('Bad request'));
    }
    await tasksService.updateTask(taskForUpdate, taskUpdateData);
    return res.status(200).json('The task updated');
  })
  .delete(async (req, res) => {
    const { task } = req;
    await tasksService.deleteTask(task);
    res.status(200).json('The task deleted successfully');
  });

module.exports = router;
