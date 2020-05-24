const algorithmsRoutes = require('./algorithms.routes');
const statsRoutes = require('./stats.routes');

module.exports = (app) => {
  app.use('/api/algorithms', algorithmsRoutes);
  app.use('/api/stats', statsRoutes);
};