const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  {
    versionKey: false
  }
);

userSchema.statics.toResponse = ({ _id: id, name, login }) => {
  return {
    id,
    name,
    login
  };
};

module.exports = userSchema;
