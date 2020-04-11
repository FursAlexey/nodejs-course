const moment = require('moment');
const fs = require('fs');
const path = require('path');

function errorLogger(error) {
  const errorLogFile = path.join(__dirname, '../logs/error.log');
  const logMessage = {
    time: moment().format('YY.MM.DD_HH:mm'),
    error: error.stack
  };
  console.error('Error:', logMessage);
  fs.appendFile(errorLogFile, `${JSON.stringify(logMessage)}\n`, err => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = errorLogger;
