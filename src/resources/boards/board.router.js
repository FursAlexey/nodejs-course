const router = require('express').Router();
const boardsService = require('./board.service');
const { tryCatch } = require('../service');
const taskRouter = require('../tasks/task.router');
const Board = require('./board.model');

router
  .route('/')
  .get(
    tryCatch(async (req, res) => {
      const boards = await boardsService.getAll();
      res.status(200).json(boards.map(board => Board.toResponse(board)));
    })
  )
  .post(
    tryCatch(async (req, res) => {
      const newBoardData = req.body;
      const createdBoard = await boardsService.createBoard(newBoardData);
      res.status(200).json(Board.toResponse(createdBoard));
    })
  );

router.param(
  'id',
  tryCatch(async (req, res, next, id) => {
    req.board = await boardsService.getBoardById(id);
    req.boardId = id;
    next();
  })
);

router
  .route('/:id')
  .get(
    tryCatch((req, res) => {
      const { board } = req;
      res.status(200).json(Board.toResponse(board));
    })
  )
  .put(
    tryCatch(async (req, res) => {
      const newBoardData = req.body;
      const { board } = req;
      const updatedBoard = await boardsService.updateBoard(board, newBoardData);
      res.status(200).json(Board.toResponse(updatedBoard));
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
