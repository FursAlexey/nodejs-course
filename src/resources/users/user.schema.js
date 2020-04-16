const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
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
