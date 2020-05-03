const greedyRoutes = require('./greedy.routes');

module.exports = (app) => {
  app.use('/api/greedy', greedyRoutes);
};