const moment = require('moment');
const path = require('path');
const fs = require('fs');

function httpRequestLogger(request) {
  const logFile = path.join(__dirname, '../logs/http.log');
  const logMessage = {
    time: moment().format('YY.MM.DD_HH:mm'),
    ...request
  };
  console.log('Request:', logMessage);
  fs.appendFile(logFile, `${JSON.stringify(logMessage)}\n`, err => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = httpRequestLogger;
