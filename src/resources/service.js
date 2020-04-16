function tryCatch(func) {
  return async (...args) => {
    const [req, res] = args;
    try {
      await func(...args);
    } catch (e) {
      const { method } = req;
      switch (method) {
        case 'GET':
        case 'DELETE':
          res.status(404).json('Not found');
          break;
        case 'POST':
        case 'PUT':
          res.status(400).json('Bad request');
          break;
        default:
          res.status(500).json('Internal error');
      }
    }
  };
}

module.exports = {
  tryCatch
};
