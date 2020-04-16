const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});
