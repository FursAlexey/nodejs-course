const router = require('express').Router();
const taskService = require('./task.service');
const taskSchema = require('./task.schema');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await taskService.getAll();
    res.status(200).json(tasks);
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

router.use((err, req, res, next) => {
  err();
});

module.exports = router;
