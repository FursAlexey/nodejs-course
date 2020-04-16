const Board = require('./board.model');

/**
 * @returns {Promise<[]>}
 */
function getAll() {
  return Board.find({});
}

/**
 * @param {object<Board>} board
 * @returns {Promise<Board>}
 */
function createBoard(board) {
  return Board.create(board);
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
function getBoardById(id) {
  return Board.findById(id);
}

/**
 * @param {object<Board>} board
 * @param {object} newBoardData
 * @returns {Promise<void>}
 */
function updateBoard(board, newBoardData) {
  return Board.updateOne(board, newBoardData);
}

/**
 * @param {object<Board>} board
 * @returns {Promise<void>}
 */
function deleteBoard(board) {
  return Board.findOneAndDelete(board);
}

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
