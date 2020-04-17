const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false
  }
);

boardSchema.statics.toResponse = ({ _id: id, title, columns }) => {
  const cols = columns.map(column => ({
    id: column._id,
    title: column.title,
    order: column.order
  }));
  return {
    id,
    title,
    columns: cols
  };
};

module.exports = boardSchema;
