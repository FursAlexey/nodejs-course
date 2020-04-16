const mongoose = require('mongoose');

const taskSchema = require('./task.schema');

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
