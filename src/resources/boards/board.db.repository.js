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
async function createBoard(board) {
  return Board.create(board);
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getBoardById(id) {
  return await Board.findById(id);
}

/**
 * @param {object<Board>} board
 * @param {object} newBoardData
 * @returns {Promise<void>}
 */
async function updateBoard(board, newBoardData) {
  return Board.findOneAndUpdate({ _id: board._id }, newBoardData);
}

/**
 * @param {object<Board>} board
 * @returns {Promise<void>}
 */
async function deleteBoard(board) {
  await Board.deleteOne(board);
}

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
