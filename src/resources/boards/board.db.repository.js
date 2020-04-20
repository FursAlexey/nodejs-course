const Board = require('./board.model');
const { getAllBoardTasksById, deleteTask } = require('../tasks/task.service');

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
async function deleteBoard(board) {
  const boardTasks = await getAllBoardTasksById(board._id);
  for (const task of boardTasks) {
    await deleteTask(task);
  }
  return Board.deleteOne(board);
}

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
