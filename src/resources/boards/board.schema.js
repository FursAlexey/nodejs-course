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

boardSchema.statics.toResponse = ({ _id: id, title, columns } = {}) => {
  return {
    id,
    title,
    columns
  };
};

module.exports = boardSchema;
