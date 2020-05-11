const algorithmsRoutes = require('./algorithms.routes');

module.exports = (app) => {
  app.use('/api/algorithms', algorithmsRoutes);
};