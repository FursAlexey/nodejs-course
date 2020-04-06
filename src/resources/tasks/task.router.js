const router = require('express').Router();
const taskService = require('./task.service');
const taskSchema = require('./task.schema');

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req;
    const boardTasks = await taskService.getAllBoardTask(boardId);
    res.status(200).json(boardTasks);
  })
  .post(async (req, res, next) => {
    const newTaskData = {
      ...req.body,
      boardId: req.boardId
    };
    const { error } = taskSchema.validate(newTaskData);
    if (error) {
      return next(() => res.status(401).json('Bad request'));
    }
    const createdTask = await taskService.createTask(newTaskData);
    res.status(200).json(createdTask);
  });

router.param('id', async (req, res, next, id) => {
  const foundedTask = await taskService.findTaskById(id);
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
    await taskService.updateTask(taskForUpdate, taskUpdateData);
    return res.status(200).json('The task updated');
  })
  .delete(async (req, res) => {
    const { task } = req;
    await taskService.deleteTask(task);
    res.status(200).json('The task deleted successfully');
  });

router.use((err, req, res, next) => {
  err();
  next();
});

module.exports = router;
