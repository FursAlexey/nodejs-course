const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const createBoard = board => boardsRepo.createBoard(board);
const getBoardById = id => boardsRepo.getBoardById(id);
const updateBoard = (board, newBoardData) =>
  boardsRepo.updateBoard(board, newBoardData);
const deleteBoard = board => boardsRepo.deleteBoard(board);

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
