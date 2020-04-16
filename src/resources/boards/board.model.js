const mongoose = require('mongoose');
const boardSchema = require('./board.schema');

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
