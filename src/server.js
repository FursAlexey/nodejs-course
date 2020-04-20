const { PORT } = require('./common/config');
const app = require('./app');
const connectDB = require('./common/dbConfig');
const errorLogger = require('./loggers/errorLogger');

app.listen(PORT, async () => {
  await connectDB();
  console.log(`App is running on http://localhost:${PORT}`);
});

process.on('uncaughtException', err => {
  errorLogger(err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise: Unhandled Rejection at:', promise, 'reason:', reason);
});
