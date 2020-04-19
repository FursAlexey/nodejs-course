const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = mongoose.Schema(
  {
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
  },
  {
    versionKey: false
  }
);

taskSchema.statics.toResponse = ({
  _id: id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
});

module.exports = taskSchema;
