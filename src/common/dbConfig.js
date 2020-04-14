const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

module.exports = async () => {
  await mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};
