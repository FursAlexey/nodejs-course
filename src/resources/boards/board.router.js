const router = require('express').Router();
const boardsService = require('./board.service');
const { tryCatch } = require('../service');
const taskRouter = require('../tasks/task.router');

router
  .route('/')
  .get(
    tryCatch(async (req, res) => {
      const boards = await boardsService.getAll();
      res.status(200).json(boards);
    })
  )
  .post(
    tryCatch(async (req, res) => {
      const newBoardData = req.body;
      const createdBoard = await boardsService.createBoard(newBoardData);
      res.status(200).json(createdBoard);
    })
  );

router.param(
  'id',
  tryCatch(async (req, res, next, id) => {
    req.board = await boardsService.getBoardById(id);
    req.boardId = id;
  })
);

router
  .route('/:id')
  .get(
    tryCatch((req, res) => {
      const { board } = req;
      res.status(200).json(board);
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const newBoardData = req.body;
      const { board } = req;
      await boardsService.updateBoard(board, newBoardData);
      res.status(200).json('The board updated successfully');
    })
  )
  .delete(
    tryCatch(async (req, res) => {
      const { board } = req;
      await boardsService.deleteBoard(board);
      res.status(204).json('The board have been deleted');
    })
  );

router.use('/:id/tasks', taskRouter);

module.exports = router;
