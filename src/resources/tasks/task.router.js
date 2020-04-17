const router = require('express').Router();
const tasksService = require('./task.service');
const { tryCatch } = require('../service');
const Task = require('./task.model');

router
  .route('/')
  .get(
    tryCatch(async (req, res) => {
      const { boardId } = req;
      const boardTasks = await tasksService.getAllBoardTask(boardId);
      res.status(200).json(boardTasks.map(task => Task.toResponse(task)));
    })
  )
  .post(async (req, res) => {
    const newTaskData = {
      ...req.body,
      boardId: req.boardId
    };
    const createdTask = await tasksService.createTask(newTaskData);
    console.log(Task.toResponse(createdTask));
    res.status(200).json(Task.toResponse(createdTask));
  });

router.param(
  'id',
  tryCatch(async (req, res, next, id) => {
    req.task = await tasksService.getTaskById(id);
    next();
  })
);

router
  .route('/:id')
  .get(
    tryCatch(async (req, res) => {
      const { task } = req;
      res.status(200).json(Task.toResponse(task));
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const { task } = req;
      const taskUpdateData = req.body;
      const updatedTask = await tasksService.updateTask(task, taskUpdateData);
      return res.status(200).json(Task.toResponse(updatedTask));
    })
  )
  .delete(async (req, res) => {
    const { task } = req;
    await tasksService.deleteTask(task);
    res.status(200).json('The task deleted successfully');
  });

module.exports = router;
