const boards = require('./board.collection');
const boardModel = require('./board.model');

/**
 * @returns {Promise<[]>}
 */
async function getAll() {
  return boards;
}

/**
 * @param {object<Board>} board
 * @returns {Promise<Board>}
 */
async function createBoard(board) {
  const newBoard = new boardModel(board);
  boards.push(newBoard);
  return newBoard;
}

/**
 * @param {string} id
 * @returns {Promise<Promise<*>|*>}
 */
async function getBoardById(id) {
  return boards.find(item => item.id === id);
}

/**
 * @param {object<Board>} board
 * @param {object} newBoardData
 * @returns {Promise<void>}
 */
async function updateBoard(board, newBoardData) {
  boards.map((item, index) => {
    if (item.id === board.id) {
      boards.splice(index, 1, {
        ...item,
        ...newBoardData
      });
    }
  });
}

/**
 * @param {object<Board>} board
 * @returns {Promise<void>}
 */
async function deleteBoard(board) {
  boards.map((item, index) => {
    if (item.id === board.id) {
      boards.splice(index, 1);
    }
  });
}

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
