const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(item => ({
      id: uuid(),
      ...item
    }));
  }
}

module.exports = Board;
