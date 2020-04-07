const router = require('express').Router();
const boardsService = require('./board.service');
const boardSchema = require('./board.schema');
const taskRouter = require('../tasks/task.router');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
  .post(
    async (req, res, next) => {
      const { value: dataForNewBoard, error } = boardSchema.validate(req.body);
      if (error) {
        return next(() => res.status(400).json('Bad request'));
      }
      req.newBoardData = dataForNewBoard;
      next();
    },
    async (req, res) => {
      const { newBoardData } = req;
      const createdBoard = await boardsService.createBoard(newBoardData);
      res.status(200).json(createdBoard);
    }
  );

router.param('id', async (req, res, next, id) => {
  const foundedBoard = await boardsService.getBoardById(id);
  if (foundedBoard) {
    req.board = foundedBoard;
    req.boardId = id;
    return next();
  }
  return next(() => res.status(404).json('Not found'));
});

router
  .route('/:id')
  .get((req, res) => {
    const { board } = req;
    res.status(200).json(board);
  })
  .put(async (req, res) => {
    const newBoardData = req.body;
    const { board } = req;
    await boardsService.updateBoard(board, newBoardData);
    res.status(200).json('The board updated successfully');
  })
  .delete(async (req, res) => {
    const { board } = req;
    await boardsService.deleteBoard(board);
    res.status(204).json('The board have been deleted');
  });

router.use('/:id/tasks', taskRouter);

router.use((err, req, res, next) => {
  err();
  next();
});

module.exports = router;
